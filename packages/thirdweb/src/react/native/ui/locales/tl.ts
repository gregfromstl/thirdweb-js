import {
  type DeepPartial,
  immutableOverride,
} from "../../../core/utils/applyOverrides.js";
import type { ThirdwebLocale } from "./types.js";

/**
 * @internal
 */
export function tlDefault(): ThirdwebLocale {
  return {
    connect_wallet: {
      label: "Ikonekta ang Wallet",
    },
    connect_wallet_details: {
      additional_actions: "Karagdagang Aksyon",
      address_copied_clipboard: "Ang address ay nakakopya na sa clipboard",
      backup_wallet: "I-backup ang Wallet",
      backup_personal_wallet: "I-backup ang personal wallet",
      import_wallet: "I-import Wallet",
      connected_to_smart_wallet: "Nakakonekta sa Smart Wallet",
      current_network: "Kasalukuyang Network",
      backup: "I-backup",
      connect_to_app: "Kumonekta sa App",
      guest: "Panauhin",
      connect: "Konekta",
      new_to_wallets: "Bago sa mga wallet?",
      view_transaction_history: "Tingnan ang Kasaysayan ng Transaksyon",
      get_started: "Simulan",
      receive_funds: "Tumangap ng Pondo",
      search_or_paste_token: "Maghanap o mag-paste ng token address",
      connect_a_wallet: "Magkonekta ng wallet",
      continue_as_guest: "Tumuloy bilang panauhin",
      tos: "Mga Tuntunin ng Serbisyo",
      privacy_policy: "Patakaran sa Privacy",
      by_connecting_you_agree: "Sa pag-konek, sumasang-ayon ka sa",
      copy_address_or_scan:
        "Kopyahin ang address ng wallet o i-scan ang QR code upang magpadala ng pondo sa wallet na ito.",
      request_testnet_funds: "Humingi ng Testnet Funds",
      your_address: "Ang iyong address",
      qr_code: "QR Code",
      select_token: "Pumili ng Token",
      send_to: "Ipadala sa",
      send_funds: "Magpadala ng Pondo",
      no_tokens_found: "Walang nakitang Tokens",
      confirm_in_wallet: "Kumpirmahin sa iyong wallet",
      select_network: "Pumili ng Network",
      switch_to: "Lumipat sa",
      no_supported_chains_detected: "Walang suportadong chain na nakita",
      recommended: "Inirerekomenda",
      network_mismatch:
        "Hindi tugma ang network sa pagitan ng contract at wallet mo",
    },
    connecting_wallet: {
      creating_encrypting:
        "Ginagawa, ine-encrypt at, sine-secure ang iyong device wallet",
      connecting_your_wallet: "Kumokonekta sa iyong wallet",
      connecting_through_pop_up:
        "Mag-login at i-konek ang iyong app sa pamamagitan ng wallet pop-up",
    },
    local_wallet: {
      guest_wallet: "Panauhing Wallet",
      backup_your_wallet: "Mag-backup ng iyong wallet",
      create_new_wallet: "Gumawa ng bagong wallet",
      private_key_mnemonic: "O Private key o Mnemonic",
      private_key_mnemonic_placeholder: "Private key / Mnemonic",
      application_can_authorize_transactions:
        "Ang application ay maaaring mag-autorisa ng anumang mga transaksyon sa ngalan ng wallet nang walang anumang mga pahintulot. Inirerekomenda namin na komonekta lamang sa mga pinagkakatiwalaang aplikasyon.",
      double_check_password:
        "Paki-double check ulit ng iyong password o private key.",
      error_accessing_file:
        "May error sa pag-access sa file. Pakisubukan muli.",
      wallet_address: "Address ng Wallet",
      this_will_download_json:
        "Ito ay magdodownload ng isang JSON file na naglalaman ng impormasyon ng iyong wallet sa iyong device na naka-encrypt gamit ang password.",
      this_is_a_temporary_wallet:
        "Ito ay isang pansamantalang guest wallet. I-download mo ang backup para hindi ka mawalan ng access dito.",
    },
    smart_wallet: {
      switch_to_smart: "Lumipat sa Smart Wallet",
      switch_to_personal: "Lumipat sa Personal Wallet",
      network_mismatch: "Hindi tugma ang Network",
      connecting: "Kumokonekta",
    },
    embedded_wallet: {
      request_new_code: "Humingi ng bagong code",
      sign_in: "Mag-sign in",
      sign_in_google: "Mag-sign in gamit ang Google",
      sign_in_facebook: "Mag-sign in gamit ang Facebook",
      sign_in_apple: "Mag-sign in gamit ang Apple",
      sign_in_email: "Mag-sign in gamit ang Email",
      enter_your_email: "Ilagay ang iyong email address",
      forgot_password: "Nakalimutan ang password",
      enter_account_recovery_code: "Ilagay ang account recovery code",
      backup_your_account: "Mag-backup ng iyong account",
      create_password: "Gumawa ng password",
      enter_password: "Ilagay ang password",
      set_password_message:
        "Mag-set ng password upang maprotektahan ang iyong account",
      enter_password_for_email: "Ilagay ang password para sa",
      make_sure_you_save_it: "Siguruhing i-save ito",
    },
    wallet_connect: {
      no_results_found: "Walang nahanap na resulta",
      search_wallets: "Maghanap ng mga Wallet",
    },
    common: {
      connect_app: "Ikonetka sa app",
      unknown_network: "Hindi Kilalang Network",
      fetching: "Kinukuha...",
      password: "Password",
      reject: "Tanggihan",
      approve: "Aprubahan",
      switch_network: "Lumipat ng Network",
      import: "Mag-import",
      username: "Username",
      amount: "Halaga",
      send: "Magpadala",
      receive: "Tumanggap",
      continue: "Magpatuloy",
      error_switching_network: "May error sa paglipat ng network",
      or: "O",
      from: "mula sa",
      to: "sa",
      next: "Susunod",
      learn_more: "Matuto pa",
    },
  };
}

/**
 * Calling this function will return the default Tagalog locale object to be set on `ThirdwebProvider` to localize the thirdweb components.
 *
 * You can also overrides parts of the default locale object by passing an object with the same structure as the default locale object and only those parts will be overridden.
 * @param overrides - An object with the same structure as the default locale object to override parts of the default locale object.
 * @example
 * ### Use default Locale
 * ```tsx
 * const tagalog = tl();
 * ```
 *
 * ### Override Locale
 * ```ts
 * const tagalog = en({
 *  connectWallet: {
 *    signIn: "Mag-sign in!"
 *  }
 * })
 * ```
 *
 * Pass it to [`ThirdwebProvider`](https://portal.thirdweb.com/typescript/v5/react/ThirdwebProvider)'s `locale` prop to localize the thirdweb components.
 *
 * ```tsx
 * function Example() {
 *   return (
 *      <ThirdwebProvider locale={tagalog}>
 *        <App />
 *      </ThirdwebProvider>
 *    )
 * }
 * ```
 * @locale
 * @returns A Tagalog locale object with the default values.
 */
export function tl(overrides?: DeepPartial<ThirdwebLocale>) {
  const defaultObj = tlDefault();
  if (!overrides) {
    return defaultObj;
  }

  return immutableOverride(defaultObj, overrides);
}
