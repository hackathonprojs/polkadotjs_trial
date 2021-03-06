// Import
import polkadotapi from '@polkadot/api';
const { ApiPromise, WsProvider } = polkadotapi;
//let ApiPromise = require('@polkadot/api').ApiPromise;
//let WsProvider = require('@polkadot/api').WsProvider;


async function test() {
  // Construct
  const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
  // other providers
  // wss://rpc.polkadot.io
  // wss://cc1-1.polkadot.network
  // wss://kusama-rpc.polkadot.io
  // wss://cc3-5.kusama.network/
  // wss://westend-rpc.polkadot.io
  // basically anything on the top left corner of https://polkadot.js.org/apps would work.



  const api = await ApiPromise.create({ provider: wsProvider });

  // Do something
  console.log(api.genesisHash.toHex());


  //
  // constants
  //

  // The length of an epoch (session) in Babe
  console.log(api.consts.babe.epochDuration.toNumber());

  // The amount required to create a new account
  //console.log(api.consts.balances.creationFee.toNumber());

  // The amount required per byte on an extrinsic
  //console.log(api.consts.balances.transactionByteFee.toNumber());


  
}

test();