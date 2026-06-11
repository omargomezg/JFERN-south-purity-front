import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const mockRouter = { navigate: jasmine.createSpy('navigate') };
const mockHttpClient = { post: jasmine.createSpy('post') };

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: any;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    localStorage.clear();
    mockHttpClient.post.calls.reset();
    mockRouter.navigate.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authorization', () => {
    it('should call httpClient.post with correct params', () => {
      mockHttpClient.post.and.returnValue(of({ token: 'abc', profile: { id: '1', rut: '123', fullName: 'Test', role: 'CUSTOMER' } }));
      service.authorization('test@email.com', 'pass').subscribe(result => {
        expect(result.token).toBe('abc');
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith(jasmine.stringMatching('/auth/token'), { email: 'test@email.com', password: 'pass' });
    });
  });

  describe('getProfile', () => {
    it('should return null if no profile in localStorage', () => {
      expect(service.getProfile()).toBeNull();
    });
    it('should return profile if present in localStorage', () => {
      const profile = { id: '1', rut: '123', fullName: 'Test', role: 'CUSTOMER' };
      localStorage.setItem('profile', JSON.stringify(profile));
      expect(service.getProfile()).toEqual(profile);
    });
  });

  describe('isLogged', () => {
    it('should return false if no token in localStorage', () => {
      expect(service.isLogged()).toBeFalse();
    });
    it('should return true if token is present in localStorage', () => {
      localStorage.setItem('token', 'abc');
      expect(service.isLogged()).toBeTrue();
    });
    it('should update statusSession observable', (done) => {
      localStorage.setItem('token', 'abc');
      service.statusSession$.subscribe(val => {
        expect(val).toBeTrue();
        done();
      });
      service.isLogged();
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'abc');
      localStorage.setItem('profile', JSON.stringify({ id: '1' }));
    });
    it('should remove token and profile from localStorage', () => {
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('profile')).toBeNull();
    });
    it('should update statusSession to false', (done) => {
      service.statusSession$.subscribe(val => {
        expect(val).toBeFalse();
        done();
      });
      service.logout();
    });
    it('should navigate to login if goToLogin is true', () => {
      service.logout(true);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
    it('should not navigate if goToLogin is false', () => {
      service.logout(false);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });
});
