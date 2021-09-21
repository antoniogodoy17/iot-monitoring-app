import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private jwt = new JwtHelperService();

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.controls.email.value.toLowerCase(),
        password: this.loginForm.controls.password.value.trim()
      };

      try {
        const res = await this.authService.login(credentials);
        const { token } = res.data;

        this.authService.setToken(token);
        this.router.navigate(['']);
      } catch (error: any) {
        console.error(error);
        alert('Something went wrong');
      }
    } else {
      alert('Please enter a valid email and a password');
    }
  }
}
