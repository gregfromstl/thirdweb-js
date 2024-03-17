import type { ThirdwebClient } from "../../../client/client.js";
import { toBigInt } from "../../../utils/bigint.js";
import { withCache } from "../../../utils/promise/withCache.js";
import type { Chain } from "../../../chains/types.js";

export type GetStoragePriceParams = {
  client: ThirdwebClient;
  chain?: Chain;
  units?: bigint | number | string;
  disableCache?: boolean;
};

/**
 * Retrieves the current cost to register a Farcaster fid in wei.
 * @param options - An object containing a client to use to fetch the price and the amount of extra storage to include in the returned price.
 * @returns A promise that resolves to the current cost of a Farcaster fid in USD.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { getStoragePrice } from "thirdweb/extensions/farcaster";
 *
 * const price = await getStoragePrice({
 *  client,
 * });
 * ```
 */
export async function getStoragePrice(
  options: GetStoragePriceParams,
): Promise<bigint> {
  const units = toBigInt(options.units ?? 1);
  if (units < 1n)
    {throw new Error(
      `Expected units to be greater than or equal to 1, got ${options.units}`,
    );}

  const fetch = async () => {
    const { getStorageRegistry } = await import("../contracts.js");
    const { unitPrice } = await import(
      "../__generated__/IStorageRegistry/read/unitPrice.js"
    );

    const contract = getStorageRegistry({
      client: options.client,
      chain: options.chain,
    });
    return (await unitPrice({ contract })) * units;
  };

  if (options.disableCache) {return fetch();}

  return withCache(fetch, {
    cacheKey: `${toBigInt(units)}:getStoragePrice`,
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
