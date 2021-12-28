import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { NotificationService } from './_services/notification.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'termAngular';
  currentUser: User;
  firstName: string;
  lastName: string;
  constructor(  private router: Router,
                private authService: AuthService,
                private userService: UserService,
                private notifService: NotificationService
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x});
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
