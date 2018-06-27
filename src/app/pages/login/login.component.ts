import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: any = {};
  loginError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onLogin() {
    this.loginError = false;
    console.log(this.loginUser);
    this.authService.login(this.loginUser)
      .then(
        ok => this.router.navigateByUrl('/'),
        err => this.loginError = true
      );
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(
        ok => this.router.navigateByUrl('/'),
        err => this.loginError = true
    );
  }

  ngOnInit() {
  }

}
