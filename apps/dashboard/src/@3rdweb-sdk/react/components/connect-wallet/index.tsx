"use client";

import { thirdwebClient } from "@/constants/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSupportedChains } from "@thirdweb-dev/react";
import { THIRDWEB_API_HOST } from "constants/urls";
import { useTrack } from "hooks/analytics/useTrack";
import {
  useAddRecentlyUsedChainId,
  useRecentlyUsedChains,
} from "hooks/chains/recentlyUsedChains";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { defineChain } from "thirdweb";
import { ConnectButton, type SiweAuthOptions } from "thirdweb/react";
import { useFavoriteChains } from "../../hooks/useFavoriteChains";
import { fetchUserQuery } from "../../hooks/useLoggedInUser";
import { popularChains } from "../popularChains";
import { clearAccessToken, setAccessToken } from "./useAccessToken";

// TODO remove all of this

type FetchAuthTokenResponse = {
  jwt: string;
};

const TOKEN_PROMISE_MAP = new Map<string, Promise<FetchAuthTokenResponse>>();

async function fetchAuthToken(
  address: string,
  abortController?: AbortController,
): Promise<FetchAuthTokenResponse> {
  if (!address) {
    throw new Error("address is required");
  }
  if (TOKEN_PROMISE_MAP.has(address)) {
    return TOKEN_PROMISE_MAP.get(address) as Promise<FetchAuthTokenResponse>;
  }
  const promise = new Promise<FetchAuthTokenResponse>((resolve, reject) => {
    return fetch(`${THIRDWEB_API_HOST}/v1/auth/token`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController?.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error.message);
        }
        return {
          jwt: json.data.jwt as string,
        };
      })
      .then(resolve)
      .catch(reject)
      .finally(() => {
        // remove the promise from the map when it's done
        TOKEN_PROMISE_MAP.delete(address);
      });
  });
  TOKEN_PROMISE_MAP.set(address, promise);
  return promise;
}

// END TODO

export async function logout() {
  // reset the token ASAP
  clearAccessToken();
  const res = await fetch(`${THIRDWEB_API_HOST}/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to logout");
  }
  return res.json();
}

export interface ConnectWalletProps {
  shrinkMobile?: boolean;
  upsellTestnet?: boolean;
  onChainSelect?: (chainId: number) => void;
  noAuth?: boolean;
  disableChainConfig?: boolean;
  disableAddCustomNetwork?: boolean;
}

export const CustomConnectWallet: React.FC<ConnectWalletProps> = ({
  noAuth,
}) => {
  const { theme } = useTheme();
  const recentChainsv4 = useRecentlyUsedChains();
  const addRecentlyUsedChainId = useAddRecentlyUsedChainId();
  // const setIsNetworkConfigModalOpen = useSetIsNetworkConfigModalOpen();
  const t = theme === "light" ? "light" : "dark";
  const allv4Chains = useSupportedChains();
  const favChainsQuery = useFavoriteChains();

  const allChains = useMemo(() => {
    return allv4Chains.map((c) => defineChain(c));
  }, [allv4Chains]);

  const chainSections = useMemo(() => {
    return [
      {
        label: "Favorites",
        chains: favChainsQuery.data.map(defineChain),
      },
      {
        label: "Popular",
        chains: popularChains.map(defineChain),
      },
      {
        label: "Recent",
        chains: recentChainsv4.map(defineChain),
      },
    ];
  }, [recentChainsv4, favChainsQuery.data]);

  const queryClient = useQueryClient();

  const authConfig = useMemo(() => {
    if (noAuth) {
      return undefined;
    }
    return {
      getLoginPayload: async (params) => {
        const res = await fetch(`${THIRDWEB_API_HOST}/v1/auth/payload`, {
          method: "POST",
          body: JSON.stringify({
            address: params.address,
            chainId: params.chainId.toString(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch login payload");
        }
        return (await res.json()).payload;
      },
      doLogin: async (payload) => {
        const res = await fetch(`${THIRDWEB_API_HOST}/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify({ payload }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to login");
        }
        const json = await res.json();

        if (json.token) {
          setAccessToken(json.token);
          await queryClient.invalidateQueries({
            queryKey: ["logged_in_user"],
          });
        }
        return json;
      },
      doLogout: async () => {
        const l = await logout();
        await queryClient.invalidateQueries({
          queryKey: ["logged_in_user"],
        });
        return l;
      },
      isLoggedIn: async (address) => {
        const user = await queryClient.fetchQuery(fetchUserQuery(address));
        if (!user) {
          return false;
        }

        const { jwt } = await fetchAuthToken(address);
        if (jwt) {
          setAccessToken(jwt);
          return true;
        }

        return false;
      },
    } satisfies SiweAuthOptions;
  }, [noAuth, queryClient]);

  return (
    <ConnectButton
      auth={authConfig}
      theme={t}
      client={thirdwebClient}
      connectModal={{
        privacyPolicyUrl: "/privacy",
        termsOfServiceUrl: "/tos",
        showThirdwebBranding: false,
        welcomeScreen: () => <ConnectWalletWelcomeScreen theme={t} />,
      }}
      appMetadata={{
        name: "thirdweb",
        logoUrl: "https://thirdweb.com/favicon.ico",
        url: "https://thirdweb.com",
      }}
      chains={allChains}
      detailsModal={{
        networkSelector: {
          sections: chainSections,
          onSwitch(chain) {
            addRecentlyUsedChainId(chain.id);
          },
          // TODO: bring this back when it works reliably
          // renderChain: CustomChainRenderer,
        },
      }}
    />
  );
};

export function ConnectWalletWelcomeScreen(props: {
  theme: "light" | "dark";
  subtitle?: string;
}) {
  const fontColor = props.theme === "light" ? "black" : "white";
  const subtitle = props.subtitle ?? "Connect your wallet to get started";

  return (
    <div
      style={{
        backgroundColor: props.theme === "dark" ? "#18132f" : "#c7b5f1",
        backgroundImage: `url("/assets/connect-wallet/welcome-gradient-${props.theme}.png")`,
      }}
      className="flex flex-col p-6 h-full bg-cover bg-center bg-no-repeat"
    >
      <div className="flex flex-grow flex-col justify-center">
        <div>
          <div className="flex justify-center">
            <Image
              className="select-none"
              style={{
                mixBlendMode: props.theme === "dark" ? "soft-light" : "initial",
              }}
              draggable={false}
              width={200}
              height={150}
              alt=""
              src="/assets/connect-wallet/tw-welcome-icon.svg"
              loading="eager"
            />
          </div>

          <div className="h-10" />
          <h2
            className="text-xl text-center font-semibold"
            style={{
              color: fontColor,
            }}
          >
            Welcome to thirdweb
          </h2>

          <div className="h-4" />

          <p
            className="text-center opacity-80 font-semibold"
            style={{
              color: fontColor,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <TrackedAnchorLink
        className="text-center font-semibold opacity-70 hover:opacity-100 hover:no-underline"
        target="_blank"
        category="custom-connect-wallet"
        label="new-to-wallets"
        href="https://blog.thirdweb.com/web3-wallet/"
        style={{
          color: fontColor,
        }}
      >
        New to Wallets?
      </TrackedAnchorLink>
    </div>
  );
}

/**
 * A link component extends the `Link` component and adds tracking.
 */
function TrackedAnchorLink(props: {
  category: string;
  label?: string;
  trackingProps?: Record<string, string>;
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const trackEvent = useTrack();
  const { category, label, trackingProps } = props;

  const onClick = useCallback(() => {
    trackEvent({ category, action: "click", label, ...trackingProps });
  }, [trackEvent, category, label, trackingProps]);

  return (
    <Link
      onClick={onClick}
      target={props.target}
      href={props.href}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </Link>
  );
}
