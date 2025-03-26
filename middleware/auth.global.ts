import { authClient } from "~/lib/auth-client";
interface UserSession {
	user: {
		id: string;
		email: string;
		emailVerified: boolean;
		name: string;
		createdAt: Date;
		updatedAt: Date;
		image?: string | null;
		firstName: string;
		lastName: string;
		banned?: boolean;
		role?: string;
		banReason?: string | null;
	};
}
export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useState<UserSession | null>('user')
	if (user.value) {
		return
	}
	else {
		const { data: session } = await authClient.useSession(useFetch);
		user.value = session.value as UserSession | null;
		console.log(session.value?.user)
		if (!session.value) {
			if (to.path === "/profile") {
				return navigateTo("/");
			}
		}
	}
});