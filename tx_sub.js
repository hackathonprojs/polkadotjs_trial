// Import
import polkadotapi from '@polkadot/api';
const { ApiPromise, WsProvider } = polkadotapi;
const { Keyring } = polkadotapi;
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


  
  // Create a keyring instance
  const keyring = new Keyring({ type: 'sr25519' });

  // Create alice (carry-over from the keyring section)
  const alice = keyring.addFromUri('//Alice');

  const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';

  // Add an account, straight mnemonic
  const BOB = keyring.addFromUri(PHRASE);
  //const BOB = keyring.addFromUri('//Bob');

  // // Make a transfer from Alice to BOB, waiting for inclusion
  // const unsub = await api.tx.balances
  //   .transfer(BOB, 12345)
  //   .signAndSend(alice, (result) => {
  //     console.log(`Current status is ${result.status}`);

  //     if (result.status.isInBlock) {
  //       console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
  //     } else if (result.status.isFinalized) {
  //       console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
  //       unsub();
  //     }
  //   });


  // Make a transfer from Alice to BOB, waiting for inclusion
  const unsub = await api.tx.balances
  .transfer(BOB, 12345)
  .signAndSend(alice, ({ events = [], status }) => {
    console.log(`Current status is ${status.type}`);

    if (status.isFinalized) {
      console.log(`Transaction included at blockHash ${status.asFinalized}`);

      // Loop through Vec<EventRecord> to display all events
      events.forEach(({ phase, event: { data, method, section } }) => {
        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
      });

      unsub();
    }
  });


  // // construct a transaction
  // const transfer = api.tx.balances.transfer(BOB, 12345);

  // // retrieve the payment info
  // const { partialFee, weight } = await transfer.paymentInfo(alice);

  // console.log(`transaction will have a weight of ${weight}, with ${partialFee.toHuman()} weight fees`);

  // // send the tx
  // transfer.signAndSend(alice, ({ events = [], status }) => { ... });
  
}

test();