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

  
  // Retrieve the current block header
  const lastHdr = await api.rpc.chain.getHeader();
  const startHdr = await api.rpc.chain.getBlockHash(lastHdr.number.unwrap().subn(500));

  // retrieve the range of changes
  const changes = await api.query.system.account.range([startHdr], ADDR);

  changes.forEach(([hash, value]) => {
    console.log(hash.toHex(), value.toHuman());
  });




}

test();