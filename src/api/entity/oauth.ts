import {OAuthProvider} from "./constant/oauth-provider.ts";


export interface IOAuthSignInRequest {
	token: string;
	provider: OAuthProvider;
}