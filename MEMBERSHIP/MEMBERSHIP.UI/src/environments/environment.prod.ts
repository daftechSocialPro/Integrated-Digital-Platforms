import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  clienUrl:"https://emwamms.org",
  baseUrl:'https://emwamms.org/api',
  assetUrl :'https://emwamms.org',
  paymentUrl : 'https://node-express-vercel-wine-gamma.vercel.app/',
  moodleUrl: 'https://emwa-elearning.com/webservice/rest/server.php'
};
