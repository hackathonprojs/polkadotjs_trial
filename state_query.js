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
  const ADDR = '5E7uGfVF4yTP9ELjowHWJyR6eevezZrsamef7u6UEC2bHJPU';

  
  // Retrieve the last timestamp
  const now = await api.query.timestamp.now();

  // Retrieve the account balance & nonce via the system module
  const { nonce, data: balance } = await api.query.system.account(ADDR);

  console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);


  // alternative way to write the above code
  // Retrieve last block timestamp, account nonce & balances
  // const [now2, { nonce, data: balances }] = await Promise.all([
  //   api.query.timestamp.now(),
  //   api.query.system.account(ADDR)
  // ]);
  // console.log(`${now2}: balance of ${balances.free} and a nonce of ${nonce}`);

  
}

test();