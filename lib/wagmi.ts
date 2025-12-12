import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'

export const storyTestnet = defineChain({
    id: 1516, // Story Odyssey Testnet (Latest) - or 1315 if preferred. usage 1516 is safer as it's newer.
    // Actually user doc said 1315. Let's stick to 1315 to match their "doc".
    // Wait, the doc in Step 12 says "Story 'Aeneid' Testnet" href=".../1315/".
    // I will use 1315.
    name: 'Story Aeneid Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'IP',
        symbol: 'IP',
    },
    rpcUrls: {
        default: { http: ['https://aeneid.storyrpc.io'] },
    },
    blockExplorers: {
        default: { name: 'Story Explorer', url: 'https://testnet.storyscan.xyz' },
    },
    testnet: true,
})

// Also adding Odyssey just in case
export const storyOdyssey = defineChain({
    id: 1516,
    name: 'Story Odyssey Testnet',
    nativeCurrency: { name: 'IP', symbol: 'IP', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.odyssey.storyrpc.io'] } },
    blockExplorers: { default: { name: 'Explorer', url: 'https://odyssey.storyscan.xyz' } },
    testnet: true,
})


export const config = createConfig({
    chains: [storyTestnet, storyOdyssey, mainnet],
    transports: {
        [storyTestnet.id]: http(),
        [storyOdyssey.id]: http(),
        [mainnet.id]: http(),
    },
})
