import type { Address } from "abitype";
import { ADDRESS_ZERO } from "../../../constants/addresses.js";
import type { BaseTransactionOptions } from "../../../transaction/types.js";
import { UniswapFee } from "../types.js";

/**
 * Represents the parameters for the `findUniswapV3Pool` function.
 */
export type GetUniswapV3PoolsParams = {
  tokenA: Address;
  tokenB: Address;
};

export type GetUniswapV3PoolsResult = {
  poolFee: UniswapFee;
  poolAddress: Address;
};

/**
 * Finds the Uniswap V3 pools for the two tokens.
 * @param options - The token pair to find any pools for any Uniswap contract that implements getPool.
 * @returns The pools' addresses and fees.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { getUniswapV3Pool } from "thirdweb/extensions/uniswap";
 * const { poolFee, poolAddress } = await getUniswapV3Pool({
 *  tokenA: "0x...",
 *  tokenB: "0x...",
 *  factoryContract: contract
 * });
 * ```
 */
export async function getUniswapV3Pools(
  options: BaseTransactionOptions<GetUniswapV3PoolsParams>,
): Promise<GetUniswapV3PoolsResult[]> {
  const { getPool } = await import(
    "../__generated__/IUniswapV3Factory/read/getPool.js"
  );

  const promises = Object.values(UniswapFee)
    .filter((value) => typeof value === "number")
    .map(async (fee) => {
      const poolAddress = await getPool({
        contract: options.contract,
        tokenA: options.tokenA,
        tokenB: options.tokenB,
        fee: Number(fee),
      });

      return {
        poolFee: Number(fee),
        poolAddress,
      };
    });

  const results = await Promise.all(promises);
  const validPools = results.filter(
    (result) => result.poolAddress && result.poolAddress !== ADDRESS_ZERO,
  );

  return validPools;
}
