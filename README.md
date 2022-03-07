# starter-iv-ng-cordova

A simple use case of Identity Vault starter app (tabs) on Cordova. Also includes Auth Connect.

1. clone the repo
2. copy a `.npmrc` with your own Enterprise key in it
3. `npm i`
4. `npm run build`
5. `ionic cordova platform add ios` (or `android`)

- **Tab 1:** Allows you to edit the Vault's/Configuration
- **Tab 2:** Shows current login state and allows user to login or logout of the app
- **Tab 3:** Requires authentication (see credentials below)

Credentials (Tab 2/3):

- **email:** test@ionic.io
- **password:** Ion54321
