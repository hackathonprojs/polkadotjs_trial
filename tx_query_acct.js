/**
 * make a tx query on an account
 */

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
  // state retrieval
  //

  // The actual address that we will use
  const ADDR = '5Hih7id3SCCt6H7LarJ5KPnaouRNVy5KMrbeUyX6giiv2ZZX';

  
  // Retrieve the last timestamp
  const now = await api.query.timestamp.now();

  // Retrieve the account balance & nonce via the system module
  // const acctInfo = await api.query.system.account(ADDR);
  // console.log(acctInfo);
  // console.log(acctInfo.data);

  //const { nonce, data: balance } = await api.query.system.account(ADDR);
  //console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

  const bonded = await api.query.staking.bonded(ADDR);
  console.log(bonded);




  
}

test();