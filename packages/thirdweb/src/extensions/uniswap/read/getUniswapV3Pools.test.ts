import { describe, it, expect } from "vitest";

import { getUniswapV3Pools } from "./getUniswapV3Pools.js";
import {
  UNISWAPV3_FACTORY_CONTRACT,
  OHM_CONTRACT_ADDRESS,
  WETH_CONTRACT_ADDRESS,
  MOG_CONTRACT_ADDRESS,
} from "~test/test-contracts.js";

describe.runIf(process.env.TW_SECRET_KEY)("uniswap.getUniswapV3Pool", () => {
  it("should return the WETH/OHM pool address and fee", async () => {
    const pools = await getUniswapV3Pools({
      contract: UNISWAPV3_FACTORY_CONTRACT,
      tokenA: WETH_CONTRACT_ADDRESS,
      tokenB: OHM_CONTRACT_ADDRESS,
    });
    expect(pools).toMatchInlineSnapshot(`
      [
        {
          "poolAddress": "0x88051B0eea095007D3bEf21aB287Be961f3d8598",
          "poolFee": 3000,
        },
        {
          "poolAddress": "0x584eC2562b937C4AC0452184D8d83346382B5D3a",
          "poolFee": 10000,
        },
      ]
    `);
  });

  it("should return an empty array when no pool exists for the pair", async () => {
    const pools = await getUniswapV3Pools({
      contract: UNISWAPV3_FACTORY_CONTRACT,
      tokenA: MOG_CONTRACT_ADDRESS,
      tokenB: OHM_CONTRACT_ADDRESS,
    });
    expect(pools).toMatchInlineSnapshot(`
      []
    `);
  });
});
