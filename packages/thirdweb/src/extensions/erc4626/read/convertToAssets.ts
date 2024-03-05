import { readContract } from "../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../transaction/types.js";

export type ConvertToAssetsParams = {
  /**
   * The number of shares to convert to assets.
   */
  shares: bigint;
};

/**
 * Calculates the amount of assets that the Vault would exchange for the amount of shares provided, in an ideal scenario where all the conditions are met.
 * @param options - The transaction options including the number of shares.
 * @returns Number of assets the average user would receive for the specified amount of shares.
 * @extension ERC4626
 * @example
 * ```ts
 * import { convertToAssets } from "thirdweb/extensions/erc4626";
 *
 * const assets = await convertToAssets({ contract, shares: 100000000000000n });
 * ```
 */
export async function convertToAssets(
  options: BaseTransactionOptions<ConvertToAssetsParams>,
): Promise<bigint> {
  const assets = await readContract({
    ...options,
    method: [
      "0x07a2d13a",
      [
        {
          type: "uint256",
        },
      ],
      [
        {
          type: "uint256",
        },
      ],
    ],
    params: [options.shares],
  });

  return assets;
}
