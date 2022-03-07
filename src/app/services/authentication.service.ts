import { Injectable, NgZone } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { mobileAuthConfig, webAuthConfig } from 'src/environments/environment';
import { VaultService } from './vault.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends IonicAuth {
  public authenticationChange$: Observable<boolean>;
  private authenticationChange: BehaviorSubject<boolean>;
  private ngZone: NgZone;
  private vaultService: VaultService;

  constructor(platform: Platform, vaultService: VaultService, ngZone: NgZone) {
    const config: IonicAuthOptions = platform.is('hybrid') ? mobileAuthConfig : webAuthConfig;
    config.tokenStorageProvider = vaultService.vault;
    super(config);
    this.isAuthenticated().then((authenticated) => { this.onAuthChange(authenticated); });
    this.ngZone = ngZone;
    this.vaultService = vaultService;
    this.authenticationChange = new BehaviorSubject(false);
    this.authenticationChange$ = this.authenticationChange.asObservable();
  }

  public async onLoginSuccess(): Promise<void> {
    this.onAuthChange(true);
  }

  public async onLogout(): Promise<void> {
    await this.vaultService.clearVault();
    this.onAuthChange(false);
  }

  private async onAuthChange(isAuthenticated: boolean): Promise<void> {
    this.ngZone.run(() => {
      this.authenticationChange.next(isAuthenticated);
    });
  }
}
