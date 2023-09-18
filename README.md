# Use injective-sidjs SDK to interact with INJECTIVE-SID contracts

# INJECTIVE-SID.js

INJECTIVE-SIDjs integrates the INJECTIVE-SID contract.

## Overview of the API

### Installation

Install @siddomains/injective-sidjs,
alongside [@injectivelabs/sdk-ts](https://www.npmjs.com/package/@injectivelabs/sdk-ts).

```
npm install @siddomains/injective-sidjs @injectivelabs/sdk-ts
```

### Getting Started

All that's needed to get started is a grpc, you should pass it and select chain id when creating a new InjectiveID
instance.

```javascript
// injective-888 testnet domain example
const InjectiveID = require('@siddomains/injective-sidjs').default
const {getInjectiveIDAddress} = require('@siddomains/injective-sidjs')
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
}

main("999.inj")
```
```javascript
// injective-1 mainnet domain example
const InjectiveID = require('@siddomains/injective-sidjs').default
const {getInjectiveIDAddress} = require('@siddomains/injective-sidjs')
const {getNetworkEndpoints, Network} = require("@injectivelabs/networks");
const {ChainId} = require("@injectivelabs/ts-types");

async function main(name) {
    const endpoints = getNetworkEndpoints(Network.Mainnet)
    const injectiveId = new InjectiveID({
        grpc: endpoints.grpc,
        chainId: ChainId.Mainnet,
        injectiveIdAddress: getInjectiveIDAddress(ChainId.Mainnet)
    })

    const address = await injectiveId.name(name).getAddress()
    console.log("name: %s, address: %s", name, address)
}

main("testtest.inj")
```


### exports

```
default - InjectiveID
validateName,
domainNode,
domainTokenId,
getInjectiveIDAddress,
```

### InjectiveID Interface

```
name(name: String) => Name
```

Returns a Name Object, that allows you to make record queries.

```
resolver(address: InjectiveAddress) => Resolver
```

Returns a Resolver Object, allowing you to query names from this specific resolver. Most useful when querying a
different resolver that is different from is currently recorded on the registry. E.g. migrating to a new resolver

```
async getName(address: InjectiveAddress) => Promise<Name>
```

Returns the reverse record for a particular Sei address.

### Name Interface

```
async getOwner() => Promise<InjectiveAddress>
```

Returns the owner/controller for the current InjectiveID name.

```
async getResolver() => Promise<InjectiveAddress>
```

Returns the resolver for the current InjectiveID name.

```
async getAddress() => Promise<InjectiveAddress>
```

Returns the address for the current InjectiveID name.

## Resolver Interface

```
address
```

Static property that returns current resolver address

```
name(name) => Name
```

Returns a Name Object that hardcoded the resolver

Build SDK and test on your test machine

```shell
yarn install
yarn run build
node main.js
```
