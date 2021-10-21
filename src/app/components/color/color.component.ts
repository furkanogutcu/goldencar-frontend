import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  colorsDataLoaded: boolean = false;
  constructor(private colorService: ColorService, private router: Router) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.colorsDataLoaded = true;
    });
  }

  routeTo(routerLink: string) {
    if (routerLink != null) {
      this.router.navigate([routerLink])
    }
  }
}
