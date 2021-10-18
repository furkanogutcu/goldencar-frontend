import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';
import { ColorAddComponent } from '../admin-color-add/admin-color-add.component';
import { ColorDeleteComponent } from '../admin-color-delete/admin-color-delete.component';
import { ColorUpdateComponent } from '../admin-color-update/admin-color-update.component';

@Component({
  selector: 'app-color-manager',
  templateUrl: './admin-color-manager.component.html',
  styleUrls: ['./admin-color-manager.component.css']
})
export class ColorManagerComponent implements OnInit {
  colors: Color[];
  constructor(
    private colorService: ColorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  showColorUpdateModal(color: Color) {
    const colorUpdateModal = this.dialog.open(ColorUpdateComponent, {
      disableClose: true,
      width: "30%"
    });
    colorUpdateModal.componentInstance.currentColor = color;

    colorUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showColorDeleteModal(color: Color) {
    const colorDeleteModal = this.dialog.open(ColorDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    colorDeleteModal.componentInstance.deletedColor = color;

    colorDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showColorAddModal() {
    const colorAddModal = this.dialog.open(ColorAddComponent, {
      disableClose: true,
      width: "25%"
    });

    colorAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
