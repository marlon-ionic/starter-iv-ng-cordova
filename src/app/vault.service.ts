import { Injectable, NgZone } from '@angular/core';
import {
  Vault,
  Device,
  DeviceSecurityType,
  VaultType,
  BrowserVault,
  IdentityVaultConfig,
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

const config: IdentityVaultConfig = {
  key: 'io.ionic.getstartedivangular',
  type: VaultType.SecureStorage,
  deviceSecurityType: DeviceSecurityType.None,
  lockAfterBackgrounded: 2000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
  customPasscodeInvalidUnlockAttempts: 2,
  unlockVaultOnLoad: false,
};
const key = 'sessionData';

export interface VaultServiceState {
  canUseBiometrics: boolean;
  canUsePasscode: boolean;
  isEmpty: boolean;
  isLocked: boolean;
  lockType: 'NoLocking' | 'Both' | 'Biometrics' | 'SystemPasscode';
  privacyScreen: boolean;
  session?: string;
}

@Injectable({ providedIn: 'root' })
export class VaultService {
  public state: VaultServiceState = {
    canUseBiometrics: false,
    canUsePasscode: false,
    isEmpty: true,
    isLocked: false,
    lockType: 'NoLocking',
    privacyScreen: false,
    session: ''
  };

  vault: Vault | BrowserVault;

  constructor(private ngZone: NgZone, private platform: Platform) {
    this.vault = platform.is('hybrid') ? new Vault(config) : new BrowserVault(config);
  }

  async init() {
    await this.platform.ready(); // This is required only for Cordova

    this.state.canUseBiometrics = await Device.isBiometricsEnabled();
    this.state.canUsePasscode = await Device.isSystemPasscodeSet();
    this.state.privacyScreen =
    this.platform.is('hybrid')
        ? await Device.isHideScreenOnBackgroundEnabled()
        : false;

    this.vault.onLock(() => {
      this.ngZone.run(() => {
        this.state.isLocked = true;
        this.state.session = undefined;
      });
    });

    this.vault.onUnlock(() => {
      this.ngZone.run(() => {
        this.state.isLocked = false;
      });
    });
    this.state.isLocked = await this.vault.isLocked();
    this.state.isEmpty = await this.vault.isEmpty();
  }
  async setLockType() {
    let type: VaultType;
    let deviceSecurityType: DeviceSecurityType;

    switch (this.state.lockType) {
      case 'Biometrics':
        type = VaultType.DeviceSecurity;
        deviceSecurityType = DeviceSecurityType.Biometrics;
        break;

        case 'Both':
        type = VaultType.DeviceSecurity;
        deviceSecurityType = DeviceSecurityType.Both;
        break;

      case 'SystemPasscode':
        type = VaultType.DeviceSecurity;
        deviceSecurityType = DeviceSecurityType.SystemPasscode;
        break;

      default:
        type = VaultType.SecureStorage;
        deviceSecurityType = DeviceSecurityType.None;
    }
    await this.vault.updateConfig({ ...this.vault.config, type, deviceSecurityType });
  }

  async setSession(value: string): Promise<void> {
    this.state.session = value;
    await this.vault.setValue(key, value);
    this.state.isEmpty = await this.vault.isEmpty();
  }

  async restoreSession() {
    const value = await this.vault.getValue(key);
    this.state.session = value;
  }
  async setPrivacyScreen(enabled: boolean) {
    await Device.setHideScreenOnBackground(enabled);
    this.state.privacyScreen = enabled;
  }

  async lockVault() {
    await this.vault.lock();
  }

  async unlockVault() {
    await this.vault.unlock();
  }
  async clearVault() {
    await this.vault.clear();
    this.state.lockType = 'NoLocking';
    this.state.session = undefined;
    this.state.isEmpty = await this.vault.isEmpty();
  }
}
