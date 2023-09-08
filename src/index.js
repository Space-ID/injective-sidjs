import {ChainGrpcWasmApi} from '@injectivelabs/sdk-ts'
import {validateName, domainNode, domainTokenId} from './utils'
import {getInjectiveIDAddress, getInjectiveIDReverseResolverAddress} from './utils/address'
import {readContract} from "./utils/injective";

class Resolver {
    constructor({address, queryClient, injectiveIdAddress}) {
        this.address = address
        this.queryClient = queryClient
        this.injectiveIdAddr = injectiveIdAddress
    }

    name(name) {
        validateName(name)
        return new Name({
            name,
            queryClient: this.queryClient,
            resolver: this.address,
            injectiveIdAddress: this.injectiveIdAddr,
        })
    }
}

class Name {
    constructor(options) {
        const {name, queryClient, injectiveIdAddress, resolver} = options
        this.queryClient = queryClient
        this.injectiveIdAddr = injectiveIdAddress
        this.name = name
        this.resolver = resolver
    }

    async getOwner() {
        try {
            const msg = {
                owner: {
                    node: domainNode(this.name)
                }
            }
            const res = await readContract(this.queryClient, this.injectiveIdAddr, msg);
            return res?.owner
        } catch (e) {
            console.error(e)
        }
    }

    async getResolver() {
        try {
            const msg = {
                resolver: {
                    node: domainNode(this.name)
                }
            }
            const res = await readContract(this.queryClient, this.injectiveIdAddr, msg)
            return res?.resolver
        } catch (e) {
            console.error(e)
        }
    }

    async getResolverAddr() {
        if (this.resolver) {
            return this.resolver // hardcoded for old resolvers or specific resolvers
        } else {
            return this.getResolver()
        }
    }

    async getAddress() {
        const resolverAddr = await this.getResolverAddr()
        if (!resolverAddr) return
        try {
            const msg = {
                address: {
                    node: domainNode(this.name)
                }
            }
            const res = await readContract(this.queryClient, resolverAddr, msg)
            return res?.address
        } catch (e) {
            console.error(e)
        }

    }
}

export default class InjectiveID {
    constructor(options) {
        const {grpc, chainId, injectiveIdAddress} = options

        if (!grpc) throw new Error('grpc is required')
        if (!chainId) throw new Error('chainId is required')

        this.queryClient = new ChainGrpcWasmApi(grpc)
        this.chainId = chainId
        this.injectiveIdAddr = injectiveIdAddress || getInjectiveIDAddress(chainId)
    }

    name(name) {
        validateName(name)
        return new Name({
            name,
            queryClient: this.queryClient,
            injectiveIdAddress: this.injectiveIdAddr,
        })
    }

    resolver(address) {
        return new Resolver({
            queryClient: this.queryClient,
            address: address,
            injectiveIdAddress: this.injectiveIdAddr,
        })
    }

    async getName(address) {
        const reverseResolver = getInjectiveIDReverseResolverAddress(this.chainId)
        if (!reverseResolver) return
        try {
            const msg = {
                name: {
                    address: address.toLowerCase()
                }
            }
            const res = await readContract(this.queryClient, reverseResolver, msg)
            if (res?.name) {
                const domain = res.name
                const addr = await this.name(domain).getAddress()
                if (addr?.toLowerCase() !== address.toLowerCase()) {
                    return
                }
                return domain
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export {
    validateName,
    domainNode,
    domainTokenId,
    getInjectiveIDAddress,
}
