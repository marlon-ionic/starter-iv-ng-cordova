import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  idToken$: Observable<any>;
  constructor(private authenticationService: AuthenticationService) {}


  ngOnInit(): void {
      this.idToken$ = from(this.authenticationService.getIdToken());
  }
}
