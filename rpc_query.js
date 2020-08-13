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

  

  // Retrieve the chain name
  const chain = await api.rpc.system.chain();

  // Retrieve the latest header
  const lastHeader = await api.rpc.chain.getHeader();

  // Log the information
  console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);


  // Subscribe to the new headers
  // await api.rpc.chain.subscribeNewHeads((lastHeader) => {
  //   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
  // });


  //
  // subscribe for 10 blocks, then unsubscribe
  //

  let count = 0;

  // Subscribe to the new headers
  // const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
  //   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

  //   if (++count === 10) {
  //     unsubHeads();
  //   }
  // });



  const unsub = await api.derive.chain.subscribeNewHeads((lastHeader) => {
    console.log(`#${lastHeader.number} was authored by ${lastHeader.author}`);
  });


}

test();