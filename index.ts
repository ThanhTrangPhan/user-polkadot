// Import
const {
    ApiPromise,
    WsProvider
} = require('@polkadot/api');

// Construct
const connect = async () => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    // Do something


    return api;
};

connect().then(async (api) => {

    const add = '13HtFCrxyz55KgkPWcnhHPwE8f8GmZrfXR3uC6jNrihGzmqz';
    // Retrieve the last timestamp
    const now = await api.query.timestamp.now();

    // Retrieve the account balance & nonce via the system module
    const { nonce, data: balance } = await api.query.system.account(add);

    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    let count = 0;

    // Subscribe to the new headers
    const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader:any) => {
        console.log(`Last block #${lastHeader.number} has hash ${lastHeader.hash}`);

        const { hash, number } = lastHeader;
        console.log(`Block number ${number.toNumber()} has hash ${hash}`);
        
        if (++count === 20) {
            unsubHeads();
        }
    });

}).catch((err) => {
    console.error(err)
}).finally(() => process.exit());

