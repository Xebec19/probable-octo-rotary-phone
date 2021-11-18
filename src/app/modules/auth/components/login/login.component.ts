import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  getErrors = (control: string) => {
    if (this.loginForm.controls[control].errors?.['required']) {
      return `${control} is required`;
    } else if (this.loginForm.controls[control].errors?.['email']) {
      return `${control} is a invalid email`;
    } else if (this.loginForm.controls[control].errors?.['minLength']) {
      return `${control} is too short`;
    } else return 'invalid';
  };

  onSubmit = () => {
    console.log(this.loginForm.value);
  };
}
