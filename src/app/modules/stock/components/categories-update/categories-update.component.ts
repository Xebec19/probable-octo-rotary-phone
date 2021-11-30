import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { async } from 'rxjs';
import {
  ICategoriesTableEntity,
  ICategory,
  ICategoryPayload,
} from 'src/app/global-models/category.model';
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
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchCategoryOptions();
    this.subscribeRoute();
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
    const payload: ICategoryPayload = {
      categoryId: +this.categoryId,
      categoryName: form.controls['name'].value,
      status: form.controls['status'].value,
      parentId: +form.controls['parent'].value,
    };
    if (!!!this.categoryId) {
      this.insertCategory(payload);
    } else {
      this.updateCategory(payload);
    }
  };

  fetchCategoryOptions = async () => {
    this.categoryService.fetchCategoriesOptions().subscribe((response) => {
      this.categoriesOptions = response.data;
    });
  };
  insertCategory = async (data: ICategoryPayload) => {
    this.categoryService.insertCategory(data).subscribe((res) => {
      this.alert.notification('Successfully inserted');
    });
  };
  updateCategory = async (data: ICategoryPayload) => {
    this.categoryService.updateCategory(data).subscribe((res) => {
      this.alert.notification('Successfully updated');
    });
  };

  subscribeRoute = async () => {
    this.route.queryParams.subscribe((param) => {
      this.categoryId = param['categoryId'];
      if (this.categoryId) {
        this.fetchCategory(this.categoryDetail, this.categoryId);
      }
    });
  };
  fetchCategory = async (form: FormGroup, categoryId: number) => {
    this.categoryService
      .fetchOneCategory(categoryId)
      .subscribe((res: IApiResponse) => {
        const { category_name, status, parent_category_id } = res.data;
        form.controls['name'].patchValue(category_name);
        form.controls['status'].patchValue(status);
        form.controls['parent'].patchValue(parent_category_id);
      });
  };
}
