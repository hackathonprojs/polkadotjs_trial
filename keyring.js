// Import
import polkadotapi from '@polkadot/api';
const { ApiPromise, WsProvider } = polkadotapi;
const { Keyring } = polkadotapi;
//import { Keyring } from '@polkadot/api';

// Crypto promise, package used by keyring internally
import polkadotutilcrypto from '@polkadot/util-crypto';
const { cryptoWaitReady } = polkadotutilcrypto;
//import { cryptoWaitReady } from '@polkadot/util-crypto';
// Some helper functions used here
import polkadotutil from '@polkadot/util';
const { stringToU8a, u8aToHex } = polkadotutil;

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


  //const keyring = new Keyring({ type: 'sr25519' });



  // Wait for the promise to resolve, async WASM or `cryptoWaitReady().then(() => { ... })`
  await cryptoWaitReady();

  // Create a keyring instance
  const keyring = new Keyring({ type: 'sr25519' });
  

  // Some mnemonic phrase
  const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';

  // Add an account, straight mnemonic
  const newPair = keyring.addFromUri(PHRASE);

  // (Advanced) add an account with a derivation path (hard & soft)
  const newDeri = keyring.addFromUri(`${PHRASE}//hard-derived/soft-derived`);

  // (Advanced, development-only) add with an implied dev seed and hard derivation
  const alice = keyring.addFromUri('//Alice2', { name: 'Alice2 default' });

  // Log some info
  console.log(`${alice.meta.name}: has address ${alice.address} with publicKey [${alice.publicKey}]`);


  // Convert message, sign and then verify
  const message = stringToU8a('this is our message');
  const signature = alice.sign(message);
  const isValid = alice.verify(message, signature);

  // Log info
  console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
  
}

test();