import {RouteObject} from "react-router-dom";
import {SignInPage} from "./signIn-page/signIn-page.tsx";
import {AuthLayout} from "./auth-layout/auth-layout.tsx";
import {SignUpPage} from "./signUp-page/signUp-page.tsx";
import {AuthUserSettingsPage} from "./auth-user-settings-page/auth-user-settings-page.tsx";

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
			path: "user",
			children: [
				{
					path: "settings",
					element: <AuthUserSettingsPage/>
				}
			]
		}
	]
}]

export const authPages = {
	signInPage: () => `/auth/signIn`,
	signUpPage: () => `/auth/signUp`,
	user: {
		settings: () => `/auth/user/settings`,
	}
}
