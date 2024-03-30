import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormPlaceComponent} from "../form-place/form-place.component";
import {CommonAdminService, PlaceService} from "../../core/service";
import {PlaceModel} from "../../core/model";
import {Router} from '@angular/router';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {PlaceStatusEnum} from "../../core/constant/app.constants";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent {
  displayedColumns: string[] = ['city', 'name', 'status', 'options'];
  dataSource: PlaceModel[] = [];

  constructor(private dialog: MatDialog, private commonAdminService: CommonAdminService,
              private router: Router,
              private placeService: PlaceService,
              private toastr: ToastrService) {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonAdminService.getPlaces().subscribe(places => this.dataSource = places);
  }

  add() {
    this.openModal(null);
  }

  edit(place: PlaceModel): void {
    this.openModal(place);
  }

  openModal(place: PlaceModel | null): void {
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

  onSlideStatus($event: MatSlideToggleChange, place: PlaceModel) {
    place.status = $event.checked ? PlaceStatusEnum.ENABLED : PlaceStatusEnum.DISABLED;
    const message = "Punto de venta ha sido " + (place.status === PlaceStatusEnum.ENABLED ? 'habilitado' : 'deshabilitado');
    this.placeService.put(place).subscribe(() => this.toastr.success(message));
  }
}
