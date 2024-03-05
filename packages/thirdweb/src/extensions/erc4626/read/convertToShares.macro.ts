import { readContract } from "../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../transaction/types.js";
/**
 * @macro delete-next-lines
 */
import { prepareMethod } from "../../../utils/abi/prepare-method.js";
import { $run$ } from "@hazae41/saumon";

type ConvertToSharesParams = {
  /**
   * The number of assets to convert to shares.
   */
  assets: bigint;
};

/**
 * Calculates the amount of shares that the Vault would exchange for the amount of underlying tokens provided, in an ideal scenario where all the conditions are met.
 * @param options - The transaction options including the number of assets.
 * @returns Number of shares the average user would receive for the specified amount.
 * @extension ERC4626
 * @example
 * ```ts
 * import { convertToShares } from "thirdweb/extensions/erc4626";
 *
 * const shares = await convertToShares({ contract, assets: 100000000000000n });
 * ```
 */
export async function convertToShares(
  options: BaseTransactionOptions<ConvertToSharesParams>,
): Promise<bigint> {
  const shares = await readContract({
    ...options,
    method: $run$(() =>
      prepareMethod("function convertToShares(uint256) returns (uint256)"),
    ),
    params: [options.assets],
  });

  return shares;
}
