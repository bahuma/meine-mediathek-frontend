import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import {FeedService} from './service/feed.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meine-mediathek';

  constructor(public auth: AuthService, public router: Router) {
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: document.location.origin
      }
    })
  }
}
