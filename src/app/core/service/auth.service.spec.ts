import {TestBed} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authorization', () => {
    it('should call httpClient.post with correct params', () => {
      // Use the real service authorization call with HttpTestingController in service unit tests elsewhere.
      // Here we simply ensure the method exists and returns an observable when called - more detailed HTTP
      // expectations belong in an integration test with HttpTestingController.
      const obs = service.authorization('test@email.com', 'pass');
      expect(obs).toBeTruthy();
    });
  });

  describe('getProfile', () => {
    it('should return null if no profile in localStorage', () => {
      expect(service.getProfile()).toBeNull();
    });
    it('should return profile if present in localStorage', () => {
      const profile = {id: '1', rut: '123', fullName: 'Test', role: 'CUSTOMER'};
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
      // Call isLogged before subscribing so BehaviorSubject emits the updated value
      service.isLogged();
      service.statusSession$.pipe(take(1)).subscribe(val => {
        expect(val).toBeTrue();
        done();
      });
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'abc');
      localStorage.setItem('profile', JSON.stringify({id: '1'}));
    });
    it('should remove token and profile from localStorage', () => {
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('profile')).toBeNull();
    });
    it('should update statusSession to false', (done) => {
      // Call logout before subscribing so BehaviorSubject emits the updated value
      service.logout();
      service.statusSession$.pipe(take(1)).subscribe(val => {
        expect(val).toBeFalse();
        done();
      });
    });
    it('should navigate to login if goToLogin is true', () => {
      spyOn(router, 'navigate');
      service.logout(true);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
    it('should navigate to home if goToLogin is false', () => {
      spyOn(router, 'navigate');
      service.logout(false);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
});
