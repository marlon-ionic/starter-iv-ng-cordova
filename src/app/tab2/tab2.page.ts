import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public authenticationChange$: Observable<boolean>;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationChange$ = authenticationService.authenticationChange$;
  }

  async login(): Promise<void> {
    await this.authenticationService.login();
 }

 async logout(): Promise<void> {
  this.authenticationService.logout();
}

}
