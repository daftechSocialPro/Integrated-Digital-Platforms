import packageInfo from '../../package.json';

export const environment = {
  // appVersion: packageInfo.version,
  // production: true,
  // clienUrl:"http://192.168.0.47:9006",
  // baseUrl:'http://192.168.0.47:9006/api',
  // assetUrl :'http://192.168.0.47:9006',
  // paymentUrl : 'https://node-express-vercel-wine-gamma.vercel.app/',
  // moodleUrl: 'https://emwa-elearning.com/webservice/rest/server.php'
  // clienUrl:"https://emwamms.org",
  // baseUrl:'https://emwamms.org/api',
  // assetUrl :'https://emwamms.org',
  // paymentUrl : 'https://node-express-vercel-wine-gamma.vercel.app/',
  // moodleUrl: 'https://emwa-elearning.com/webservice/rest/server.php'

  appVersion: packageInfo.version,
  production: true,
  clienUrl:"http://5.75.176.87:4201",
  baseUrl:'http://5.75.176.87:9006/api',
  assetUrl :'http://5.75.176.87:9006',
  paymentUrl : 'https://node-express-vercel-wine-gamma.vercel.app/',
  moodleUrl: 'https://emwa-elearning.com/webservice/rest/server.php'

  
};
