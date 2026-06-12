import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPlaceComponent } from '../form-place/form-place.component';
import {
  AuthService,
  CommonAdminService,
  PlaceService,
} from '../../core/service';
import { PlaceInterface } from '../../core/model';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PlaceStatusEnum } from '../../core/constant/app.constants';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RoleEnum } from '../../core/constant/role.enum';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {
  displayedColumns: string[] = ['city', 'name', 'status', 'options'];
  dataSource: PlaceInterface[] = [];
  private breakpointObserver = inject(BreakpointObserver);
  isMobile = signal<boolean>(false);
  role: string = RoleEnum.STOCKER;
  loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private commonAdminService: CommonAdminService,
    private router: Router,
    private placeService: PlaceService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.role = this.authService.getProfile()?.role || RoleEnum.ROLE_ANONYMOUS;
    this.loadPlaces();
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  loadPlaces(): void {
    this.commonAdminService.getPlaces().subscribe((places) => {
      this.dataSource =
        this.role === RoleEnum.STOCKER
          ? places.filter((x) => x.status === 'ENABLED')
          : places;
      this.loading = false;
    });
  }

  add() {
    this.openModal(null);
  }

  edit(place: PlaceInterface): void {
    this.openModal(place);
  }

  openModal(place: PlaceInterface | null): void {
    const dialogRef = this.dialog.open(FormPlaceComponent, {
      data: place,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPlaces();
    });
  }

  addBottles(placeId: string): void {
    this.router.navigateByUrl('/agregar-bidones/' + placeId);
  }

  onSlideStatus($event: MatSlideToggleChange, place: PlaceInterface) {
    place.status = $event.checked
      ? PlaceStatusEnum.ENABLED
      : PlaceStatusEnum.DISABLED;
    const message =
      'Punto de venta ha sido ' +
      (place.status === PlaceStatusEnum.ENABLED
        ? 'habilitado'
        : 'deshabilitado');
    this.placeService.put(place).subscribe(() => this.toastr.success(message));
  }
}
