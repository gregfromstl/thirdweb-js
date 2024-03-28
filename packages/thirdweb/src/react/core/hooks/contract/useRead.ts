import {
  useQuery,
  queryOptions as defineQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { Abi, AbiFunction, ExtractAbiFunctionNames } from "abitype";
import { getFunctionId } from "../../../../utils/function-id.js";
import { stringify } from "../../../../utils/json.js";
import type {
  BaseTransactionOptions,
  ParseMethod,
} from "../../../../transaction/types.js";
import type { PrepareContractCallOptions } from "../../../../transaction/prepare-contract-call.js";
import {
  readContract,
  type ReadContractResult,
} from "../../../../transaction/read-contract.js";
import type { ThirdwebContract } from "../../../../contract/contract.js";
import type { PreparedMethod } from "../../../../utils/abi/prepare-method.js";

type PickedQueryOptions = Pick<UseQueryOptions, "enabled">;

/**
 * A hook to read from a contract.
 * @param options - The options for reading from a contract
 * @returns a query object.
 * @example
 * ```jsx
 * import { useReadContract } from "thirdweb/react";
 * const { data, isLoading } = useReadContract({contract, method: "totalSupply"});
 * ```
 * @contract
 */
export function useReadContract<
  const abi extends Abi,
  const method extends abi extends { length: 0 }
    ? AbiFunction | string
    : ExtractAbiFunctionNames<abi>,
>(
  options: PrepareContractCallOptions<abi, method> & {
    queryOptions?: PickedQueryOptions;
  },
): UseQueryResult<
  ReadContractResult<PreparedMethod<ParseMethod<abi, method>>[2]>
>;
/**
 * A hook to read from a contract.
 * @param extension - An extension to call.
 * @param options - The read extension params.
 * @returns a query object.
 * @example
 * ```jsx
 * import { useReadContract } from "thirdweb/react";
 * import { totalSupply } form "thirdweb/extensions/erc20"
 * const { data, isLoading } = useReadContract(totalSupply);
 * ```
 */
export function useReadContract<
  const abi extends Abi,
  const params extends object,
  result,
>(
  extension: (options: BaseTransactionOptions<params, abi>) => Promise<result>,
  options: BaseTransactionOptions<params, abi> & {
    queryOptions?: PickedQueryOptions;
  },
): UseQueryResult<result>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function useReadContract<
  const abi extends Abi,
  const method extends abi extends {
    length: 0;
  }
    ?
        | AbiFunction
        | `function ${string}`
        | ((contract: ThirdwebContract<abi>) => Promise<AbiFunction>)
    : ExtractAbiFunctionNames<abi>,
  const params extends object,
  result,
>(
  extensionOrOptions:
    | ((options: BaseTransactionOptions<params, abi>) => Promise<result>)
    | (PrepareContractCallOptions<abi, method> & {
        queryOptions?: PickedQueryOptions;
      }),
  options?: BaseTransactionOptions<params, abi> & {
    queryOptions?: PickedQueryOptions;
  },
) {
  // extension case
  if (typeof extensionOrOptions === "function") {
    if (!options) {
      throw new Error(
        `Missing second argument for "useReadContract(<extension>, <options>)" hook.`,
      ) as never;
    }
    const { queryOptions, contract, ...params } = options;

    const query = defineQuery({
      queryKey: [
        "readContract",
        contract.chain.id,
        contract.address,
        getFunctionId(extensionOrOptions),
        stringify(params),
      ] as const,
      // @ts-expect-error - TODO: clean up the type issues here
      queryFn: () => extensionOrOptions({ ...params, contract }),
      ...queryOptions,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery(query);
  }
  // raw tx case
  if ("method" in extensionOrOptions) {
    const { queryOptions, ...tx } = extensionOrOptions;

    const query = defineQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [
        "readContract",
        tx.contract.chain.id,
        tx.contract.address,
        tx.method,
        stringify(tx.params),
      ] as const,
      queryFn: () => readContract(extensionOrOptions),
      ...queryOptions,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery(query);
  }

  throw new Error(
    `Invalid "useReadContract" options. Expected either a read extension or a transaction object.`,
  ) as never;
}
