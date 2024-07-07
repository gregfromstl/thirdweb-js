import type { Chain } from "../src/types";
export default {
  "chain": "SHARECLE",
  "chainId": 1234567,
  "explorers": [
    {
      "name": "Etherscan",
      "url": "https://etherscan.io",
      "standard": "none"
    }
  ],
  "faucets": [],
  "infoURL": "https://sharecle.com/",
  "name": "Sharecle Mainnet",
  "nativeCurrency": {
    "name": "SHARECLE COIN",
    "symbol": "SHR",
    "decimals": 18
  },
  "networkId": 1234567,
  "rpc": [
    "https://1234567.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet.sharecle.com"
  ],
  "shortName": "shr",
  "slip44": 1,
  "slug": "sharecle",
  "testnet": false
} as const satisfies Chain;