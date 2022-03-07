// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import { IonicAuthOptions } from '@ionic-enterprise/auth';

const baseConfig: IonicAuthOptions = {
  audience: '',
  authConfig: 'auth0',
  clientID: 'yLasZNUGkZ19DGEjTmAITBfGXzqbvd00',
  discoveryUrl: 'https://dev-2uspt-sz.us.auth0.com/.well-known/openid-configuration',
  logoutUrl: '',
  scope: 'openid offline_access email picture profile',
  logLevel :'DEBUG'
};

export const mobileAuthConfig: IonicAuthOptions = {
  ...baseConfig,
  iosWebView: 'private',
  logoutUrl: 'io.ionic.starter://tabs/tab1',
  platform: 'cordova',
  redirectUri: 'io.ionic.starter://login'
};

export const webAuthConfig: IonicAuthOptions = {
  ...baseConfig,
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web',
  redirectUri: 'http://localhost:8100/login'
};

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
