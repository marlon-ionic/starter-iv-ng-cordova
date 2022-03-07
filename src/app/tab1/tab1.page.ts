import { Component } from '@angular/core';
import { VaultServiceState, VaultService } from '../services/vault.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public state: VaultServiceState;

  constructor(private vaultService: VaultService) {
    this.state = vaultService.state;
  }

  async ionViewDidEnter(){
    //Update state based on vault's current config
    await this.vaultService.updateVaultState();
    this.state = this.vaultService.state;
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
