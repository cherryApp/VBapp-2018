import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { isNull } from 'util';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: any = {};
  isLoggedIn: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  onLogout() {
    this.authService.logOut();
  }

  ngOnInit() {
    this.afAuth.user.subscribe(
      user => { 
        this.user = user;
        this.isLoggedIn = !isNull(user);
      },
      err => console.log(err)
    );
  }

}
