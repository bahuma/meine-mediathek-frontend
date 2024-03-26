// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AuthConfig} from "@auth0/auth0-angular";

const authConfig: AuthConfig = {
  domain: 'bhm-mediathek.eu.auth0.com',
  clientId: 'zkhpJuy7IN9ipGDvNiufZydf8MRoYCun',
  authorizationParams: {
    audience: "http://localhost:3002/",
    redirect_uri: "http://localhost:4200",
  },
  httpInterceptor: {
    allowedList: [
      'http://localhost:3002/*',
    ]
  }
}

export const environment = {
  production: false,
  backendUrl: "http://localhost:3002",
  authConfig: authConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
