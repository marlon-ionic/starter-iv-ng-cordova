import { Component, OnDestroy, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginSuccessSubscription?: Subscription;
  constructor(private authenticationService: AuthenticationService, private navController: NavController) { }

  ngOnInit() {
    // this.loginSuccessSubscription = this.authenticationService.authenticationChange$
    // .subscribe(bool => {
    //   if(bool) {
    //     this.navController.navigateRoot(['/tabs/tab3']);
    //   }
    // });
  }

  ngOnDestroy(): void {
      this.loginSuccessSubscription?.unsubscribe();
  }

  async login() {
    try {
      // https://ionic.io/docs/auth-connect/securing-tokens#handling-privacy-screens
      await Device.setHideScreenOnBackground(false);
      await this.authenticationService.login();
      await Device.setHideScreenOnBackground(true);
      await this.navController.navigateRoot(['/tabs/tab3']);
    } catch(e) {
      this.navController.navigateRoot(['/login'], {animated: false});
    }
  }

}
