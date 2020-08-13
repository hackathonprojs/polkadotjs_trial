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


  const ADDR = '5E7uGfVF4yTP9ELjowHWJyR6eevezZrsamef7u6UEC2bHJPU';

  // Retrieve the hash & size of the entry as stored on-chain
  const [entryHash, entrySize] = await Promise.all([
    api.query.system.account.hash(ADDR),
    api.query.system.account.size(ADDR)
  ]);

  // Output the info
  console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);


  // ------------------------

  // Extract the info
  const { meta, method, section } = api.query.system.account;

  // Display some info on a specific entry
  console.log(`${section}.${method}: ${meta.documentation.join(' ')}`);
  console.log(`query key: ${api.query.system.account.key(ADDR)}`);



  
}

test();