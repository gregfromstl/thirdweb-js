import type { BaseTransactionOptions } from "../../../transaction/types.js";
import { prepareContractCall } from "../../../transaction/prepare-contract-call.js";
import type { Address } from "abitype";
/**
 * @macro delete-next-lines
 */
import { prepareMethod } from "../../../utils/abi/prepare-method.js";
import { $run$ } from "@hazae41/saumon";

/**
 * Represents the parameters for the `mint` function
 */
export type MintParams = {
  shares: bigint;
  receiver: Address;
};

/**
 * Mints the specified number of shares in exchange for assets.
 * @param options - The transaction options including the receiver and the number of shares to mint.
 * @returns A prepared transaction object.
 * @extension ERC4626
 * @example
 * ```ts
 * import { mint } from "thirdweb/extensions/erc4626";
 * const tx = await mint({
 *  contract,
 *  receiver: "0x...",
 *  shares: 100n,
 * });
 * ```
 */
export function mint(options: BaseTransactionOptions<MintParams>) {
  return prepareContractCall({
    ...options,
    method: $run$(() =>
      prepareMethod("function mint(uint256, address) returns (uint256)"),
    ),
    params: [options.shares, options.receiver],
  });
}
