import { sendAndConfirmTransaction } from "../../../transaction/actions/send-and-confirm-transaction.js";
import type { ClientAndChainAndAccount } from "../../../utils/types.js";
import {
  deployCreate2Factory,
  getDeployedCreate2Factory,
} from "./create-2-factory.js";
import {
  getDeployedInfraContract,
  prepareInfraContractDeployTransaction,
  type InfraContractId,
} from "./infra.js";

/**
 * @internal
 * @returns the deployed clone factory contract
 */
export async function deployCloneFactory(options: ClientAndChainAndAccount) {
  // create2 factory
  const create2Factory = await getDeployedCreate2Factory(options);
  if (!create2Factory) {
    await deployCreate2Factory(options);
  }

  // Forwarder
  const forwarder = await getOrDeployInfraContract({
    ...options,
    contractId: "Forwarder",
    constructorParams: [],
  });

  // clone factory
  return getOrDeployInfraContract({
    ...options,
    contractId: "TWCloneFactory",
    constructorParams: [forwarder.address],
  });
}

/**
 * @internal
 * @returns the deployed infra contract
 */
export async function deployImplementation(
  options: ClientAndChainAndAccount & {
    contractId: string;
    constructorParams?: unknown[];
    publisher?: string;
    version?: string;
  },
) {
  return getOrDeployInfraContract({
    ...options,
    contractId: options.contractId,
    constructorParams: options.constructorParams || [],
    publisher: options.publisher,
    version: options.version,
  });
}

/**
 * Convenience function to get or deploy an infra contract
 * @internal
 */
export async function getOrDeployInfraContract(
  options: ClientAndChainAndAccount & {
    contractId: InfraContractId;
    constructorParams: unknown[];
    publisher?: string;
    version?: string;
  },
) {
  const infraContract = await getDeployedInfraContract(options);
  if (infraContract) {
    return infraContract;
  }
  const transaction = prepareInfraContractDeployTransaction(options);
  await sendAndConfirmTransaction({
    transaction,
    account: options.account,
  });
  const deployedInfraContract = await getDeployedInfraContract(options);
  if (!deployedInfraContract) {
    throw new Error(`Failed to deploy ${options.contractId}`);
  }
  return deployedInfraContract;
}
