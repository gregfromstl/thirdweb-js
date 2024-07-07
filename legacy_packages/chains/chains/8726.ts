import type { Chain } from "../src/types";
export default {
  "chain": "Storagechain",
  "chainId": 8726,
  "explorers": [
    {
      "name": "Storscan",
      "url": "https://explorer-storagechain.invo.zone/?network=StorageChain",
      "standard": "none"
    }
  ],
  "faucets": [],
  "infoURL": "https://storagechain.io/about-us",
  "name": "Storagechain Mainnet",
  "nativeCurrency": {
    "name": "Storagechain",
    "symbol": "STOR",
    "decimals": 18
  },
  "networkId": 8726,
  "rpc": [
    "https://8726.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet-validator.storagechain.io"
  ],
  "shortName": "stor",
  "slug": "storagechain",
  "testnet": false
} as const satisfies Chain;