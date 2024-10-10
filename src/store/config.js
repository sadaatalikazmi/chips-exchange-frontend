
/* -- set app title --*/
const AppTitle = 'FRONTEND Chips Exchange';

/* -- set app mode -- */
// const AppMode = [''];
const AppMode = ['development'];

/* -- set API URLs --*/
const testing = 'https://webserver.ChipsExchange.club';
const production = 'https://webserver.ChipsExchange.club';
const development = 'https://webserver.ChipsExchange.club';

let baseURL;
let env = AppMode[0] || 'development', message = '';

switch (AppMode[0]) {
  case 'development':
    baseURL = "https://chipserver.metawarriors.world";
    message = 'Please switch to developement BaseURL';
    break;
  case 'production':
    // networkId = 1;
    // SocketUrl = production;
    // message = 'Please switch your network to Ethereum Mainnet';
    // explorer = 'https://etherscan.io'
    // opensea = 'https://opensea.io/'
    break;
  case 'testing':
    // networkId = 4;
    // SocketUrl = testing;
    // message = 'Please switch your network to Rinkeby testnet';
    // explorer = 'https://rinkeby.etherscan.io'
    // opensea = 'https://testnets.opensea.io/'
    break;
  default:
    baseURL = "https://chipserver.metawarriors.world";
    message = 'Please switch to developement BaseURL';
};

let ApiUrl = `${baseURL}/api/`;
export { AppTitle, ApiUrl, baseURL, env };