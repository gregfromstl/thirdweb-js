import type { Chain } from "../src/types";
export default {
  "chain": "lif3chain",
  "chainId": 1811,
  "explorers": [
    {
      "name": "lif3scout",
      "url": "https://testnet.lif3scout.com",
      "standard": "none"
    }
  ],
  "faucets": [],
  "features": [
    {
      "name": "EIP155"
    }
  ],
  "infoURL": "https://docs.lif3.com/",
  "name": "Lif3 Chain Testnet",
  "nativeCurrency": {
    "name": "LIF3",
    "symbol": "LIF3",
    "decimals": 18
  },
  "networkId": 1811,
  "rpc": [
    "https://1811.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnet-evm.lif3.com"
  ],
  "shortName": "lif3-testnet",
  "slug": "lif3-chain-testnet",
  "testnet": true
} as const satisfies Chain;