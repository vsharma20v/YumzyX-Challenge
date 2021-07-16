import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Credential } from '../../model/credential';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidCredential: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  loginSubmitHandler(form: NgForm) {
    this.spinner.show();
    const { email, password } = form.form.value;
    const credential: Credential = {
      email: email,
      password: password,
    };
    this.authService.logIn(credential).subscribe(
      (resp) => {
        const xAccessToken = resp.headers.get('x-access-token');
        this.authService.setAccessToken(xAccessToken);
        form.resetForm();
        this.router.navigateByUrl('/home');
      },
      (error) => {
        if (error.error.type === 'error') {
          this.invalidCredential = true;
          setTimeout(() => {
            this.invalidCredential = false;
          }, 2000);
        }
        form.resetForm();
        this.spinner.hide();
      }
    );
  }
}
