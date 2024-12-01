import {RouteObject} from "react-router-dom";
import {SignInPage} from "./signIn-page/signIn-page.tsx";
import {AuthLayout} from "./auth-layout/auth-layout.tsx";
import {SignUpPage} from "./signUp-page/signUp-page.tsx";
import {AuthUserSettingsPage} from "./auth-user-settings-page/auth-user-settings-page.tsx";
import {RequireAuth} from "../../components/auth/require-auth/require-auth.tsx";
import {PasswordRestorePage} from "../auth-actions/password-restore-page/password-restore-page.tsx";

export const authPages = {
	signInPage: () => `/auth/signIn`,
	signUpPage: () => `/auth/signUp`,
	restorePassword: () => `/auth/restore-password`,
	user: {
		settings: () => `/auth/user/settings`,
	}
}

export const authRoutes: RouteObject[] = [{
	path: "/auth",
	element: <AuthLayout/>,
	children: [
		{
			path: "signIn",
			element: <SignInPage/>
		}, {
			path: "signUp",
			element: <SignUpPage/>
		}, {
			path: "restore-password",
			element: <PasswordRestorePage/>
		}, {
			path: "user",
			element: <RequireAuth unauthenticatedRedirectPath={authPages.signInPage()}/>,
			children: [
				{
					path: "settings",
					element: <AuthUserSettingsPage/>
				}
			]
		}
	]
}]