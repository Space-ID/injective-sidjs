import {ChainId} from '@injectivelabs/ts-types'

function getInjectiveIDAddress(chainId) {
    switch (chainId) {
        case ChainId.Mainnet:
            return 'inj1hm8vs8sr2h9nk0x66vctfs528wrp6k3gtgg275'
        case ChainId.Testnet:
            return 'inj1lpcmv6cm0ptwdputs63m6j03jevhdgws96dnwk'
        default:
            return ''
    }
}

function getInjectiveIDReverseResolverAddress(chainId) {
    switch (chainId) {
        case ChainId.Mainnet:
            return 'inj1x9m0hceug9qylcyrrtwqtytslv2jrph433thgu'
        case ChainId.Testnet:
            return 'inj1ppneyx6qfnye26k9mwnf3ngyelvqng67f5v948'
        default:
            return ''
    }
}


export {
    getInjectiveIDReverseResolverAddress,
    getInjectiveIDAddress
}
