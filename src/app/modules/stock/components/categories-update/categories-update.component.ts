import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICategoriesTableEntity, ICategory } from 'src/app/global-models/category.model';
import { IApiResponse } from 'src/app/global-models/response.model';
import { NotificationService } from 'src/app/global-services/notification.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.css'],
})
export class CategoriesUpdateComponent implements OnInit {
  categoryId: number = 0;
  categoryDetail = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('active'.toUpperCase(), [Validators.required]),
    parent: new FormControl('0'),
  });
  categoriesOptions!: ICategory[];
  readonly statusOptions = ['active'.toUpperCase(), 'inactive'.toUpperCase()];
  constructor(
    private alert: NotificationService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.fetchCategoryOptions();
  }

  getErrors = (control: AbstractControl) => {
    if (control.errors?.['required']) {
      return 'This field is required';
    } else if (control.errors?.['pattern']) {
      return 'Invalid value';
    } else return 'invalid';
  };

  onSubmit = async (form: FormGroup) => {
    if (form.invalid) {
      this.alert.notification('Invalid Category');
      return;
    }
    if(form.controls)
    console.log(form.value);
  };

  fetchCategoryOptions = async () => {
    this.categoryService.fetchCategoriesOptions().subscribe((response) => {
      this.categoriesOptions = response.data;
    });
  };
  insertCategory = (data: ICategoriesTableEntity) => {
    this.categoryService.insertCategory(data).subscribe(res => {
      this.alert.notification("Successfully inserted");
    })
  }
  updateCategory = (data:ICategoriesTableEntity) => {
    this.categoryService.updateCategory(data).subscribe(res => {
      this.alert.notification("Successfully updated");
    })
  }
}
