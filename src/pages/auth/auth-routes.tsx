import {RouteObject} from "react-router-dom";
import {SignInPage} from "./signin-page/signin-page.tsx";

export const authRoutes: RouteObject[] = [{
	path: "/auth",
	children: [
		{
			path: "signIn",
			element: <SignInPage/>
		}
	]
}]

export const authPages = {
	signInPage: () => `/auth/signIn`
}
