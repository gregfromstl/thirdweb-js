import type { Chain } from "../src/types";
export default {
  "chain": "MTHN",
  "chainId": 9395,
  "explorers": [
    {
      "name": "Evoke SmartChain Explorer",
      "url": "https://explorer.evokescan.org",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "infoURL": "https://explorer.evokescan.org",
  "name": "Evoke Mainnet",
  "nativeCurrency": {
    "name": "MTHN",
    "symbol": "MTHN",
    "decimals": 18
  },
  "networkId": 9395,
  "rpc": [
    "https://9395.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet-rpc.evokescan.org"
  ],
  "shortName": "MTHN",
  "slug": "evoke",
  "testnet": false
} as const satisfies Chain;