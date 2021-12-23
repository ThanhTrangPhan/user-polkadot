
const {
    ApiPromise,
    WsProvider
} = require('@polkadot/api');

// This script will listen to all MOVRs transfers (Substrate & Ethereum)

const main = async () => {
  const wsProvider = new WsProvider("wss://rpc.polkadot.io");
  const polkadotApi = await ApiPromise.create({
    provider: wsProvider,
  });
  polkadotApi.query.system.events((events: any) => {
    // Loop through the Vec<EventRecord>
    events.forEach(({ event }) => {
      if (event.section == "balances" && event.method == "Transfer") {
        const from = event.data[0].toString();
        const to = event.data[1].toString();
        const balance = event.data[2].toBigInt();

        console.log(`Transfer from ${from} to ${to} of ${balance}`);
      }
    });
  });
};

main();