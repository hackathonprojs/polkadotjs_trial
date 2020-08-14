
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
    
  // Some mnemonic phrase
  const phraseWestendTest01 = 'race matter basket upgrade asthma number voyage cute funny allow chronic camera';

  // Add an account, straight mnemonic
  const westendTest01 = keyring.addFromUri(phraseWestendTest01);


  // The actual address that we will use
  const sender = westendTest01;
  const recipient = '5Hih7id3SCCt6H7LarJ5KPnaouRNVy5KMrbeUyX6giiv2ZZX';
  

  

  // estimate the fees as RuntimeDispatchInfo, using the signer (either
  // address or locked/unlocked keypair) (When overrides are applied, e.g
  //  nonce, the format would be `paymentInfo(sender, { nonce })`)
  const info = await api.tx.balances
    .transfer(recipient, 123)
    .paymentInfo(sender);

  // log relevant info, partialFee is Balance, estimated for current
  console.log(`
    class=${info.class.toString()},
    weight=${info.weight.toString()},
    partialFee=${info.partialFee.toHuman()}
  `);



  // -------------------------

  // make a transfer
  api.tx.balances
  .transfer(recipient, 123)
  .signAndSend(sender, ({ status, events }) => {
    if (status.isInBlock || status.isFinalized) {
      events
        // find/filter for failed events
        .filter(({ section, method }) =>
          section === 'system' &&
          method === 'ExtrinsicFailed'
        )
        // we know that data for system.ExtrinsicFailed is
        // (DispatchError, DispatchInfo)
        .forEach(({ data: [error, info] }) => {
          if (error.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError(error.asModule);
            const { documentation, method, section } = decoded;

            console.log(`${section}.${method}: ${documentation.join(' ')}`);
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            console.log(error.toString());
          }
        });
    }
  });


}

test();



