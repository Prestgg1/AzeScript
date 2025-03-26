import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "../utils/auth";
export const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
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