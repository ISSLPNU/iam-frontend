import {OAuthProvider} from "./constant/oauth-provider.ts";

export interface IAuthenticationActionRequest{
	token: string;
}

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	tfaEnabled: boolean;
	role: string;
	oauthProvider: OAuthProvider;
}

export interface IUserSignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface IUserSignIn {
	email: string;
	password: string;
	captchaToken?: string;
}

export interface ITwoFactorRequest extends IAuthenticationActionRequest {
	secret: number;
}

export interface IUserSignInResponse extends IAuthenticationActionRequest {
	twoFactor: boolean;
	emailConfirmed: boolean;
	oauthProvider: OAuthProvider;
}

export interface IUserRestorePasswordRequest {
	email: string;
}

export interface IUserRestorePassword extends IAuthenticationActionRequest {
	password: string;
}