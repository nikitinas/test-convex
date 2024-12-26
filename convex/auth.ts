import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import VK from "@auth/core/providers/vk";
import Yandex from "@auth/core/providers/yandex";
import { convexAuth } from "@convex-dev/auth/server";

const apiVersion = "5.131"


export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub,
    Yandex,
    Google,
    {
      ...VK({ checks: [] }), // Fix: PKCE is unsupported for server-side authorization
      ...{
        userinfo: {
          //Problem is that VK provider works incorrectly
          url: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async request(context: any) {
            /*
              Here we store email of user if it presented, because user.get don't return it.
           */
            const email = context.tokens.email || undefined;
            const access_token = context.tokens.access_token;
            const f = await fetch(
              `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}&access_token=${access_token}`
            );
            return { ...(await f.json()), email: email };
          },
        },
        profile(result) {
          /*
           * Again, default VK provider just works not as expected, it is why we need to save user data, and also
           * adds email to user.
           *
           * */
          const profile = result.response?.[0] ?? (result.id ? result : {});
          return {
            id: profile.id.toString(),
            name: [profile.first_name, profile.last_name].filter((v) => !!v).join(' '),
            email: result.email || null,
            image: profile.photo_100,
          };
        },
        token: {
          url: `https://oauth.vk.com/access_token?v=${apiVersion}`,
          conform: async (r: Response) => {
            /*
             * And yet again base VK provider just don't working.
             * */
            const resp = await r.json();
            return new Response(
              JSON.stringify({
                token_type: 'dpop',
                ...resp,
              }),
              { headers: { "Content-Type": "application/json" }, status: r.status },
            );
          },
        }
      }
    }
  ],
});
