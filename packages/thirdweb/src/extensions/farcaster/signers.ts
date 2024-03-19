import { fromBytes } from "../../utils/encoding/from-bytes.js";
import type { Hex } from "../../utils/encoding/hex.js";
import * as ed25519 from "@noble/ed25519";

export type Ed25519Keypair = {
  publicKey: Hex;
  privateKey: Hex;
};

/**
 * Generates an Ed25519 keypair to be used as an account signer.
 * @returns A promise resolving to the generated keypair.
 * @example
 * ```
 * createSigner()
 * ```
 */
export async function createEd25519Keypair(): Promise<Ed25519Keypair> {
  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = await ed25519.getPublicKey(privateKey);
  return {
    publicKey: fromBytes(publicKey, "hex"),
    privateKey: fromBytes(privateKey, "hex"),
  };
}
