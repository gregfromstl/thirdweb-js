/** The following is adapted from the Hubble monorepo */

import type { Address } from "abitype";
import { encodeAbiParameters } from "../../utils/abi/encodeAbiParameters.js";
import type { Hex } from "../../utils/encoding/hex.js";
import type { Account } from "../../wallets/interfaces/wallet.js";
import {
  ID_GATEWAY_ADDRESS,
  KEY_GATEWAY_ADDRESS,
  SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS,
} from "./constants.js";

///////////////
/** Register */
///////////////

export const ID_GATEWAY_EIP_712_DOMAIN = {
  name: "Farcaster IdGateway",
  version: "1",
  chainId: 10,
  verifyingContract: ID_GATEWAY_ADDRESS,
} as const;

export const ID_GATEWAY_REGISTER_TYPE = [
  { name: "to", type: "address" },
  { name: "recovery", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
] as const;

export const ID_GATEWAY_EIP_712_TYPES = {
  domain: ID_GATEWAY_EIP_712_DOMAIN,
  types: { Register: ID_GATEWAY_REGISTER_TYPE },
} as const;

export type IdGatewayRegisterMessage = {
  /** FID custody address */
  to: Address;
  /** FID recovery address */
  recovery: Address;
  /** IdGateway nonce for signer address */
  nonce: bigint;
  /** Unix timestamp when this message expires */
  deadline: bigint;
};

export type SignRegisterOptions = {
  account: Account;
  message: IdGatewayRegisterMessage;
};

export async function signRegister({
  account,
  message,
}: SignRegisterOptions): Promise<Hex> {
  return account.signTypedData({
    ...ID_GATEWAY_EIP_712_TYPES,
    primaryType: "Register",
    message,
  });
}

//////////////////
/** Key Request */
//////////////////

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: "Farcaster SignedKeyRequestValidator", // EIP-712 domain data for the SignedKeyRequestValidator.
  version: "1",
  chainId: 10,
  verifyingContract: SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS,
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: "requestFid", type: "uint256" },
  { name: "key", type: "bytes" },
  { name: "deadline", type: "uint256" },
];

export const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_TYPES = {
  domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
  types: { SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE },
} as const;

export const SIGNED_KEY_REQUEST_METADATA_ABI = [
  {
    components: [
      {
        name: "requestFid",
        type: "uint256",
      },
      {
        name: "requestSigner",
        type: "address",
      },
      {
        name: "signature",
        type: "bytes",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "SignedKeyRequestMetadata",
    type: "tuple",
  },
] as const;

export type SignedKeyRequestMessage = {
  /** FID of user or app requesting key */
  requestFid: bigint;
  /** Signer public key */
  key: Hex;
  /** Unix timestamp when this message expires */
  deadline: bigint;
};

export type SignKeyRequestOptions = {
  account: Account;
  message: SignedKeyRequestMessage;
};

export async function signKeyRequest({
  account,
  message,
}: SignKeyRequestOptions): Promise<Hex> {
  return account.signTypedData({
    ...SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_TYPES,
    primaryType: "SignedKeyRequest",
    message,
  });
}

export type SignedKeyRequestMetadataOptions = {
  account: Account;
  message: SignedKeyRequestMessage;
};

export async function getSignedKeyRequestMetadata({
  account,
  message,
}: SignedKeyRequestMetadataOptions): Promise<Hex> {
  const signature = await signKeyRequest({ account, message });
  return encodeAbiParameters(SIGNED_KEY_REQUEST_METADATA_ABI, [
    {
      requestFid: message.requestFid,
      requestSigner: account.address,
      signature: signature,
      deadline: message.deadline,
    },
  ]);
}

//////////
/** Add */
//////////

export const KEY_GATEWAY_EIP_712_DOMAIN = {
  name: "Farcaster KeyGateway",
  version: "1",
  chainId: 10,
  verifyingContract: KEY_GATEWAY_ADDRESS,
} as const;

export const KEY_GATEWAY_ADD_TYPE = [
  { name: "owner", type: "address" },
  { name: "keyType", type: "uint32" },
  { name: "key", type: "bytes" },
  { name: "metadataType", type: "uint8" },
  { name: "metadata", type: "bytes" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
] as const;

export const KEY_GATEWAY_EIP_712_TYPES = {
  domain: KEY_GATEWAY_EIP_712_DOMAIN,
  types: { Add: KEY_GATEWAY_ADD_TYPE },
} as const;

export type KeyGatewayAddMessage = {
  /** FID owner address */
  owner: Address;
  /** Key type. The only currently supported key type is 1, for EdDSA signers. */
  keyType: number;
  /** Public key to register onchain */
  key: Hex;
  /** Metadata type. The only currently supported metadata type is 1. */
  metadataType: number;
  /** ABI-encoded SignedKeyRequestMetadata struct */
  metadata: Hex;
  /** KeyGateway nonce for signer address */
  nonce: bigint;
  /** Unix timestamp when this message expires */
  deadline: bigint;
};

export type SignAddOptions = {
  account: Account;
  message: KeyGatewayAddMessage;
};

export async function signAdd({
  account,
  message,
}: SignAddOptions): Promise<Hex> {
  return account.signTypedData({
    ...KEY_GATEWAY_EIP_712_TYPES,
    primaryType: "Add",
    message: message,
  });
}
