import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.css'],
})
export class ProductsUpdateComponent implements OnInit {
  productForm!: FormGroup;
  constructor() {}

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
  }
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
  fileUpload = async (event: any) => {
    console.log(event.target.files[0]);
  };
}
