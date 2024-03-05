import type { Address } from "abitype";
import { readContract } from "../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../transaction/types.js";
/**
 * @macro delete-next-lines
 */
import { prepareMethod } from "../../../utils/abi/prepare-method.js";
import { $run$ } from "@hazae41/saumon";

export type MaxMintParams = {
  /**
   * The address to check max mintable shares for.
   */
  receiver: Address;
};

/**
 * Returns the maximum number of shares that can be minted from the Vault for the receiver, through a mint call.
 * @param options - The transaction options including the address to check.
 * @returns Maximum number of shares that can be minted to the provided address.
 * @extension ERC4626
 * @example
 * ```ts
 * import { maxMint } from "thirdweb/extensions/erc4626";
 *
 * const maxShares = await maxMint({ contract, receiver: "0x..." });
 * ```
 */
export async function maxMint(
  options: BaseTransactionOptions<MaxMintParams>,
): Promise<bigint> {
  const maxShares = await readContract({
    ...options,
    method: $run$(() =>
      prepareMethod("function maxMint(address) returns (uint256)"),
    ),
    params: [options.receiver],
  });

  return maxShares;
}
