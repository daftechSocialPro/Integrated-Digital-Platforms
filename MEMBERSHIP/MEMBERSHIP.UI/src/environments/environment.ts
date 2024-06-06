// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  clienUrl:'http://localhost:4200',
  baseUrl:'http://localhost:5267/api',
  assetUrl :'http://localhost:5267',
  paymentUrl : 'https://emwamms.org/',
  //paymentUrl : 'https://node-express-vercel-wine-gamma.vercel.app/',
  moodleUrl: 'https://emwa-elearning.com/webservice/rest/server.php',
  smsUrl:'https://api.geezsms.com/api/v1/sms/send'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
