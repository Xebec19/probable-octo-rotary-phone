import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/global-services/notification.service';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.css'],
})
export class CategoriesUpdateComponent implements OnInit {
  categoryDetail = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    parent: new FormControl(''),
  });
  constructor(private alert: NotificationService) {}

  ngOnInit(): void {}

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
    console.log(form.value);
  };
}
