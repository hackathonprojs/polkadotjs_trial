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



  // retrieve Option<StakingLedger>
  const ledger = await api.query.staking.ledger('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');
  // retrieve ValidatorPrefs (will yield the default value)
  const prefs = await api.query.staking.validators('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');

  console.log(ledger.isNone, ledger.isSome); // true, false
  console.log(JSON.stringify(prefs.toHuman())); // {"commission":"0"}


  // exists
  const sizeY = await api.query.staking.validators.size('DB2mp5nNhbFN86J9hxoAog8JALMhDXgwvWMxrRMLNUFMEY4');
  // non existent
  const sizeN = await api.query.staking.validators.size('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');

  console.log(sizeY.isZero(), sizeY.toNumber()); // false 4
  console.log(sizeN.isZero(), sizeY.toNumber()); // true 0


  // Retrieves the entries for all slashes, in all eras (no arg)
  const allEntries = await api.query.staking.nominatorSlashInEra.entries();

  // nominatorSlashInEra(EraIndex, AccountId) for the types of the key args
  allEntries.forEach(([{ args: [era, nominatorId] }, value]) => {
    console.log(`${era}: ${nominatorId} slashed ${value.toHuman()}`);
  });


  // Retrieves the keys for the slashed validators in era 652
const slashedKeys = await api.query.staking.nominatorSlashInEra.keys(652);

// key args still contains [EraIndex, AccountId] decoded
console.log(`slashed: ${slashedKeys.map(({ args: [era, nominatorId] }) => nominatorId)}`);



}

test();