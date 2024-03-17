import type { ThirdwebClient } from "../../../client/client.js";
import { toBigInt } from "../../../utils/bigint.js";
import { withCache } from "../../../utils/promise/withCache.js";
import type { Chain } from "../../../chains/types.js";

export type GetRegistrationPriceParams = {
  client: ThirdwebClient;
  chain?: Chain;
  extraStorage?: bigint | number | string;
  disableCache?: boolean;
};

/**
 * Retrieves the current cost to register a Farcaster fid in wei.
 * @param options - An object containing a client to use to fetch the price and the amount of extra storage to include in the returned price.
 * @returns A promise that resolves to the current cost of a Farcaster fid in wei.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { getRegistrationPrice } from "thirdweb/extensions/farcaster";
 *
 * const price = await getRegistrationPrice({
 *  client,
 * });
 * ```
 */
export async function getRegistrationPrice(
  options: GetRegistrationPriceParams,
): Promise<bigint> {
  const extraStorage = toBigInt(options.extraStorage ?? 0);
  if (extraStorage < 0n)
    {throw new Error(
      `Expected extraStorage to be greater than or equal to 0, got ${options.extraStorage}`,
    );}

  const fetch = async () => {
    const { getIdGateway } = await import("../contracts.js");
    const { price } = await import("../__generated__/IIdGateway/read/price.js");

    const contract = getIdGateway({
      client: options.client,
      chain: options.chain,
    });
    return price({ contract, extraStorage: toBigInt(extraStorage) });
  };

  if (options.disableCache) {return fetch();}

  return withCache(fetch, {
    cacheKey: `${toBigInt(extraStorage)}:getRegistrationPrice`,
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
