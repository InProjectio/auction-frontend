import Web3 from 'web3';

// eslint-disable-next-line import/no-mutable-exports
let web3 = null
if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
}

export default web3;
