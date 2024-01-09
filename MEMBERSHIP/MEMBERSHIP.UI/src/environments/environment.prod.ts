import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  clienUrl:'http://192.168.0.47:4204',
  baseUrl:'http://192.168.0.47:9006/api',
  assetUrl :'http://192.168.0.47:9006',
  paymentUrl : 'https://node-express-vercel-wine-gamma.vercel.app/'
};
