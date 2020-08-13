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

  // The actual address that we will use
  const ADDR = '5E7uGfVF4yTP9ELjowHWJyR6eevezZrsamef7u6UEC2bHJPU';

  

  // simple tx
  // Sign and send a transfer from Alice to Bob
  const txHash = await api.tx.balances
  .transfer(BOB, 12345)
  .signAndSend(alice);

  // Show the hash
  console.log(`Submitted with hash ${txHash}`);



}

test();