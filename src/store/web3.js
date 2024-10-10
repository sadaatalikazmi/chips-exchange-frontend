import Web3 from "web3";

let web3 = new Web3(window.ethereum);

// let web3;
// if (window.ethereum !== undefined) {
//     let providers = window.ethereum.providers;
//     providers.map(provider => {
//         if (provider['isMetaMask'] == true) web3 = new Web3(provider);;
//     });
// }
// else web3 = new Web3(window.ethereum)

export { web3 };