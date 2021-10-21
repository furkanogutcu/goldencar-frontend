import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  brandsDataLoaded: boolean = false;

  constructor(private brandService: BrandService, private router: Router) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brandsDataLoaded = true;
    });
  }

  routeTo(routerLink: string) {
    if (routerLink != null) {
      this.router.navigate([routerLink])
    }
  }
}
