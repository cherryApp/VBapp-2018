import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { isNull } from 'util';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private afs: AngularFireAuth
  ) { }

  onLogout() {
    this.authService.logOut();
  }

  ngOnInit() {
    this.afs.user.subscribe(
      user => {
        this.isLoggedIn = !isNull(user);
      }
    )
  }

}
