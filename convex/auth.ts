import { ProfileCallback } from "@auth/core/providers";
import GitHub from "@auth/core/providers/github";
import VK, { VkProfile } from "@auth/core/providers/vk";
import Yandex from "@auth/core/providers/yandex";
import { convexAuth } from "@convex-dev/auth/server";

const apiVersion = "5.199"


export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub,
    Yandex,
    {
      ...VK({ checks: [] }), // Fix: PKCE is unsupported for server-side authorization
      token: {
        url: `https://oauth.vk.com/access_token?v=${apiVersion}`,
        conform: async (response: Response) => {
          const data = await response.json()
          return new Response(
            // Fix: OperationProcessingError: "response" body "token_type" property must be a string
            JSON.stringify({
              token_type: 'dpop',
              ...data,
            }),
            // Fix: OperationProcessingError: "response" content-type must be application/json
            { headers: { "content-type": "application/json" }, status: response.status }
          )
        }
      },
      profile(profile: VkProfile) {
        return {
          id: profile.id.toString(),
          name: [profile.first_name, profile.last_name].filter(Boolean).join(" "),
          email: profile.email ?? null,
          image: profile.photo_100,
        }
      },
    }
  ],
});
