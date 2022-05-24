import { Component } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { VaultServiceState, VaultService } from '../vault.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public state: VaultServiceState;
  public promptLabel = 'Use biometric security';

  constructor(private vaultService: VaultService) {
    this.state = vaultService.state;
  }

  async ionViewDidEnter() {
   await this.showBiometricPrompt();
  }

  async showBiometricPrompt() {
    try {
      await  Device.showBiometricPrompt({
        iosBiometricsLocalizedReason: this.promptLabel
      });
    } catch (e) {
      // This will catch if request fails or the user cancels the prompt!
      console.log('caught a biometic prompt error', e);
    }
  }

  async setSession(data: string) {
    await this.vaultService.setSession(data);
  }

  async restoreSession() {
    await this.vaultService.restoreSession();
  }

  async lockVault() {
    await this.vaultService.lockVault();
  }

  async unlockVault() {
    await this.vaultService.unlockVault();
  }

 async  setPrivacyScreen() {
    await this.vaultService.setPrivacyScreen(this.state.privacyScreen);
  }

  async setLockType() {
    await this.vaultService.setLockType();
  }
  async clearVault() {
    await this.vaultService.clearVault();
  }

}
