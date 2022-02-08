import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { Color } from 'src/app/models/entities/color';
import { UploadFile } from 'src/app/models/uploadFile';
import { BrandService } from 'src/app/services/brand.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './admin-car-add.component.html',
  styleUrls: ['./admin-car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  years: number[] = [];

  carImagesFiles: UploadFile[] = [];
  carImagesPaths: any[] = []

  constructor(
    private carAddModal: MatDialogRef<CarAddComponent>,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImagesService: CarImagesService,
    private toastrService: ToastrService,
    private carService: CarService,
    private errorService: ErrorService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.getYears(100);
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  add() {
    if (!this.carAddForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form");
    } else {
      let carModel = Object.assign({}, this.carAddForm.value);
      //Add Car to Server
      this.carService.add(carModel).subscribe(carAddSuccessResponse => {
        if (this.carImagesFiles.length === 0) {  //No pictures, just car added
          this.toastrService.success("Yeni araç başarıyla eklendi", "İşlem başarılı");
          this.closeCarAddModal();
        }
        else {  //If car pictures will be uploaded
          if (this.carImagesFiles.length > 5) { //Max 5 Image
            this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Araç eklenmedi");
          } else {
            this.uploadAllImagesToServer(this.carImagesFiles, carAddSuccessResponse.data).then((unUploadFileList) => {
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadedFiles.length === 0) {
                this.toastrService.success("Yeni araç ve resimleri başarıyla eklendi", "İşlem başarılı");
                this.closeCarAddModal();
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastrService.warning("Yeni araç başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                this.closeCarAddModal();
              }
            })

          }
        }
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Araç eklenemedi");
      })
    }
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[], carId: number): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter: number = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file, carId).then(fileStatus => {
              if (fileStatus.uploadStatus === false) {
                unUploadedFiles.push(fileStatus);
              }
            }).then(() => {
              counter += 1;
              if (counter === uploadFiles.length) {
                resolveAllUploads();
              }
            })
          }
        })
        allUploads.then(() => {
          methodResolve(unUploadedFiles);
        })
      } else {
        let emptyArray: UploadFile[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private uploadImageToServer(uploadFile: UploadFile, carId: number): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.carImagesService.uploadImage(uploadFile.file, carId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, (uploadFail) => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  deleteImageFromCarImagesList(selectedImage: UploadFile) {
    this.carImagesFiles.splice(this.carImagesFiles.indexOf(selectedImage), 1);
    this.carImagesPaths.splice(this.carImagesPaths.indexOf(selectedImage), 1);
  }

  addCarImagesToCarImagesAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if (this.carImagesFiles.length < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.carImagesFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addCarImageToCarImagesPaths(image).then((success) => {
              if (success) {
                this.carImagesFiles.push(uploadFile);
              }
            });
          } else {
            this.toastrService.warning("Bu resmi daha önce listeye eklediniz", "Zaten listede");
          }
        }
      } else {
        this.toastrService.error("En fazla 5 resim ekleyebilirsiniz", "Resim eklenemiyor");
      }

    }
  }

  private addCarImageToCarImagesPaths(image: any): Promise<boolean> { //Source: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.carImagesPaths.push(reader.result);
            result(true);
          }
        } else {
          this.toastrService.error("Yalnızca resim dosyası yükleyebilirsiniz", "Dosya eklenmedi");
          result(false);
        }
      })
    })
  }

  private checkFileMimeType(file: any): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) != null) {
        methodResolve(true);
      } else {
        methodResolve(true);
      }
    })
  }

  private getYears(decreaseYear: number) {
    let year: number = new Date().getFullYear();
    this.years.push(year);
    for (let i = 1; i < decreaseYear + 1; i++) {
      this.years.push(year - i);
    }
  }

  private getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  private getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  private createCarAddForm() {
    this.carAddForm = this.formService.createCarForm();
  }

  closeCarAddModal() {
    this.carAddModal.close();
  }
}
