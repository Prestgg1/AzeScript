import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "./auth"
export const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
    fetchOptions: {
        auth: {
            type:"Bearer",
            token: () => localStorage.getItem("bearer_token") || "" // get the token from localStorage
         },
        onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token")
           
            if(authToken){
              localStorage.setItem("bearer_token", authToken);
            }
        }
    }
});

export const {
    signIn,
    signOut,
    signUp,
    useSession,
    forgetPassword,
    resetPassword,
    deleteUser
} = authClient;