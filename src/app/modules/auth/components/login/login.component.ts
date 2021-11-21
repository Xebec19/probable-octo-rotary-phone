import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApiResponse } from 'src/app/global-models/response.model';
import { NotificationService } from 'src/app/global-services/notification.service';
import { UserDetailsService } from 'src/app/global-services/user-details.service';
import { HttpService } from '../../../../global-services/httpRequest.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  subs!: Subscription[];
  constructor(
    private httpService: HttpService,
    private notification: NotificationService,
    private userDetails: UserDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    if (!!this.userDetails.fetchToken) {
      this.router.navigate(['auth/dashboard']);
    }
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

  onSubmit = async () => {
    if (this.loginForm.invalid) {
      return;
    }
    const data = this.loginForm.value;
    (await this.httpService.postRequest('/public/login', data)).subscribe(
      (resp: IApiResponse) => {
        console.log(resp);
        this.userDetails.setToken = resp.data.split(' ')[1];
        this.router.navigate(['/auth/dashboard']);
      },
      (error) => {
        this.notification.notification('Login denied', 'close');
      }
    );
  };
}
