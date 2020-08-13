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

  

  // Retrieve the active era
  const activeEra = await api.query.staking.activeEra();

  // retrieve all exposures for the active era
  const exposures = await api.query.staking.erasStakers.entries(activeEra.index);

  exposures.forEach(([key, exposure]) => {
    console.log('key arguments:', key.args.map((k) => k.toHuman()));
    console.log('     exposure:', exposure.toHuman());
  });



}

test();