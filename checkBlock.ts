const {
    ApiPromise,
    WsProvider
} = require('@polkadot/api');

const main = async () => {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({
      provider: wsProvider,
    });
    let count = 0;
    api.rpc.chain.subscribeNewHeads((lastHeader:any) => {
        console.log(`Last block #${lastHeader.number} has hash ${lastHeader.hash}`);


        const { hash, number } = lastHeader;
        console.log(`Block number ${number.toNumber()} has hash ${hash}`);
        
    });
}