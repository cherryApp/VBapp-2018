import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: {email: string, password: string} = {
    email: "",
    password: ""
  };
  loginError: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(loginData): void {
    this.loginError = "";
    this.authService.login(loginData)
      .then(
        resolve => this.router.navigateByUrl('/'),
        reject => this.loginError = "Hiba az adatokban!"
      );
  }

  onLoginGoogle(): void {
    this.authService.loginWithGoogle()
      .then(
        resolve => this.router.navigateByUrl('/'),
        reject => this.loginError = "Hiba az adatokban!"
      );
  }

  ngOnInit() {
  }

}
