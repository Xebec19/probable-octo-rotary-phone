import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, Subscription, take } from 'rxjs';
import { ICategory } from 'src/app/global-models/category.model';
import { IApiResponse } from 'src/app/global-models/response.model';
import { HttpService } from 'src/app/global-services/httpRequest.service';
import { NotificationService } from 'src/app/global-services/notification.service';

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.css'],
})
export class ProductsUpdateComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  profileUrl!: Observable<string>;
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;
  @ViewChild('file', { static: true })
  fileRef!: ElementRef;
  subs: Subscription[] = [];
  categories: ICategory[] = [];
  productId: number = 0;
  readonly statusOptions = ['active', 'inactive'];

  constructor(
    private storage: AngularFireStorage,
    private notification: NotificationService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subs.push(this.route.queryParams.subscribe((param) => {
      this.productId = param['productId'];
    }));
    this.productForm = new FormGroup({
      productId: new FormControl(this.productId ?? 0),
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
    this.getCategories();
    if (this.productId > 0) {
      this.route.data.subscribe((res) => {
        const {
          category_id,
          product_name,
          product_image,
          quantity,
          status,
          price,
          delivery_price,
          product_desc,
        } = res['productDetails'].data;
        this.productForm.controls['productName'].patchValue(product_name);
        this.productForm.controls['categoryId'].patchValue(category_id);
        this.productForm.controls['productImage'].patchValue(product_image);
        this.productForm.controls['quantity'].patchValue(quantity);
        this.productForm.controls['status'].patchValue(status);
        this.productForm.controls['price'].patchValue(price);
        this.productForm.controls['deliveryPrice'].patchValue(delivery_price);
        this.productForm.controls['productDesc'].patchValue(product_desc);
        // todo add country id as well
      });
    } else {
      this.productForm.reset({
        quantity: 0,
        status: 'active',
        price: 0,
        deliveryPrice: 0,
        countryId: 1,
      });
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach((val) => val.unsubscribe());
  }
  getCategories = () => {
    this.subs.push(
      this.httpService
        .getRequest('/products/get-categories')
        .subscribe((val) => {
          this.categories.push(...val.data);
        })
    );
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
    if (form.invalid) {
      this.notification.notification('Invalid product details');
      return;
    }
    // console.log(form.value);
    this.httpService
      .postRequest('/products/insert-product', form.value)
      .subscribe(
        (res: IApiResponse) => {
          this.router.navigate(['/stock/product-table']);
          this.notification.notification('Uploaded product');
        },
        (error: any) => {
          this.notification.notification(
            'Error occurred while uploading product'
          );
        }
      );
  };
  clickFileUpload = async () => {
    this.fileRef.nativeElement.click();
  };
  fileUpload = (event: any) => {
    const file = event.target.files[0];
    let len = event.target.files[0].name.split('.').length;
    const ext = event.target.files[0].name.split('.')[len - 1];
    if (
      !(
        ext === 'png' ||
        ext === 'PNG' ||
        ext === 'jpg' ||
        ext === 'JPG' ||
        ext === 'jpeg' ||
        ext === 'JPEG'
      )
    ) {
      this.notification.notification('Invalid image type');
      return;
    }
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
            this.productForm.controls['productImage'].patchValue(url);
          })
        )
      )
      .subscribe();
  };
}
