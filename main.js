const InjectiveID = require('./dist/index').default
const {getInjectiveIDAddress} = require('./dist/index')
const {getNetworkEndpoints, Network} = require("@injectivelabs/networks");
const {ChainId} = require("@injectivelabs/ts-types");


async function main(name) {
    const endpoints = getNetworkEndpoints(Network.Testnet)

    const injectiveId = new InjectiveID({
        grpc: endpoints.grpc,
        chainId: ChainId.Testnet,
        injectiveIdAddress: getInjectiveIDAddress(ChainId.Testnet)
    })

    const address = await injectiveId.name(name).getAddress()
    console.log("name: %s, address: %s", name, address)
    const owner = await injectiveId.name(name).getOwner()
    console.log("name: %s, owner: %s", name, owner)
    const res = await injectiveId.getName(address)
    console.log("address: %s, name: %s", address, res)
}

main("999.inj")
