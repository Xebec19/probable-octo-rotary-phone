import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { async, finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.css'],
})
export class ProductsUpdateComponent implements OnInit {
  productForm!: FormGroup;
  profileUrl!: Observable<string>;
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;
  @ViewChild('file', { static: true })
  fileRef!: ElementRef;
  constructor(private storage: AngularFireStorage) {
    const ref = this.storage.ref('name-your-file-path-here');
    this.profileUrl = ref.getDownloadURL();
  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      productImage: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      status: new FormControl('active', [Validators.required]),
      price: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      deliveryPrice: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      productDesc: new FormControl('', [Validators.required]),
      countryId: new FormControl(1, [Validators.required]),
    });
    this.getFileUrl();
  }
  getFileUrl = async () => {
    const ref = 'name-your-file-path-here';
    const fileRef = this.storage.ref(ref);
    fileRef.getDownloadURL();
  };
  getError = (control: string) => {
    if (this.productForm.controls[control].errors?.['required']) {
      return 'this field is required';
    } else if (this.productForm.controls[control].errors?.['pattern']) {
      return 'invalid input';
    } else if (this.productForm.controls[control].errors?.['minLength']) {
      return 'too short';
    } else return 'invalid';
  };
  onSubmit = async (form: FormGroup) => {
    console.log(form.value);
  };
  clickFileUpload = async () => {
    this.fileRef.nativeElement.click();
  };
  fileUpload = (event: any) => {
    const file = event.target.files[0];
    const d = JSON.stringify(new Date()).replace(/"/g, '');
    const filePath = d + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.percentageChanges().subscribe((percentage) => {
      console.log(percentage);
    });
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((url) => {
            this.downloadURL = url;
          })
        )
      )
      .subscribe();
  };
}
