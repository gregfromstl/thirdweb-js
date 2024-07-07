import type { Chain } from "../src/types";
export default {
  "chain": "Evoke",
  "chainId": 31414,
  "explorers": [
    {
      "name": "Evoke SmartChain Testnet Explorer",
      "url": "https://testnet-explorer.evokescan.org",
      "standard": "EIP3091"
    }
  ],
  "faucets": [
    "https://faucet.evokescan.org"
  ],
  "infoURL": "https://testnet-explorer.evokescan.org",
  "name": "Evoke Testnet",
  "nativeCurrency": {
    "name": "MTHN Testnet",
    "symbol": "MTHN",
    "decimals": 18
  },
  "networkId": 31414,
  "rpc": [
    "https://31414.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnet-rpc.evokescan.org"
  ],
  "shortName": "tmthn",
  "slug": "evoke-testnet",
  "testnet": true
} as const satisfies Chain;