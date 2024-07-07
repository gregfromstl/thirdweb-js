import type { Chain } from "../src/types";
export default {
  "chain": "Storagechain",
  "chainId": 8727,
  "explorers": [
    {
      "name": "Storscan",
      "url": "https://explorer-storagechain.invo.zone/?network=StorageChain%20Testnet",
      "standard": "none"
    }
  ],
  "faucets": [],
  "infoURL": "https://storagechain.io/about-us",
  "name": "Storagechain Testnet",
  "nativeCurrency": {
    "name": "Storagechain",
    "symbol": "STOR",
    "decimals": 18
  },
  "networkId": 8727,
  "rpc": [
    "https://8727.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnet-validator.storagechain.io"
  ],
  "shortName": "tstor",
  "slug": "storagechain-testnet",
  "testnet": true
} as const satisfies Chain;