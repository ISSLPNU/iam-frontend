import {RouteObject} from "react-router-dom";
import {RedirectToAction} from "./redirect-to-action/redirect-to-action.tsx";
import {AuthenticationAction} from "../../api/entity/constant/authentication-action.ts";
import {TwoFactorPage} from "./two-factor-page/two-factor-page.tsx";
import {SignUpConfirmationPage} from "./sign-up-confirmation-page/sign-up-confirmation-page.tsx";
import {PasswordRestorePage} from "./password-restore-page/password-restore-page.tsx";

export const authActionsRoutes: RouteObject[] = [{
	path: "/action",
	children: [
		{
			path: ":token",
			element: <RedirectToAction/>
		},{
			path: "two-factor/:token",
			element: <TwoFactorPage/>
		},{
			path: "sign-up-confirmation/:token",
			element: <SignUpConfirmationPage/>
		},{
			path: "password-restore/:token",
			element: <PasswordRestorePage/>
		},
	]
}]

const ActionRoutes: Record<AuthenticationAction, (token: string) => string> = {
	TWO_FACTOR: (token) => `/action/two-factor/${token}`,
	SIGN_UP_CONFIRMATION: (token) => `/action/sign-up-confirmation/${token}`,
	PASSWORD_RESTORE: (token) => `/action/password-restore/${token}`,
}

export const authActionsPages = {
	redirectToAction: (token: string) => `/action/${token}`,
	getActionPath: (action: AuthenticationAction, token: string) => ActionRoutes[action](token),
}