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
  const ADDR1 = '5E7uGfVF4yTP9ELjowHWJyR6eevezZrsamef7u6UEC2bHJPU';
  const ADDR2 = '5F7R6WphhR7r7wMgMfUi5NCeqRZwEVCyPaC9gkrb9Tv15Sew';

  
  // Retrieve the last timestamp
  const now = await api.query.timestamp.now();

  // Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
  const unsubAccts = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
    const [{ data: balance1 }, { data: balance2 }] = balances;

    console.log(`The balances are ${balance1.free} and ${balance2.free}`);
  });


  // // comment out because there is an error.
  // // Retrieve a snapshot of the validators
  // // does not work.  "TypeError: api.query.session.validators.keys is not a function"
  // const validatorKeys = await api.query.session.validators.keys();
  

  // // Subscribe to the balances for these accounts
  // const unsubValidators = await api.query.balances.account.multi(validatorKeys, (balances) => {
  //   console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
  // });

  
  // Subscribe to the timestamp, our index and balance
  const unsub = await api.queryMulti([
    api.query.timestamp.now,
    [api.query.system.account, ADDR1]
  ], ([now, { nonce, data: balance }]) => {
    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
  });

}

test();