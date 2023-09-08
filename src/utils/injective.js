import {binaryToBase64, fromBase64, toBase64} from "@injectivelabs/sdk-ts";

const readContract = async (client, address, msg) => {
    try {
        const res = await client.fetchSmartContractState(address, toBase64(msg));
        const str = binaryToBase64(res.data)
        return fromBase64(str);
    } catch (e) {
        console.error(e)
        throw e
    }
}

export {
    readContract
}
