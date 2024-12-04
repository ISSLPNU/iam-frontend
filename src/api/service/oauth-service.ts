import {AxiosResponse} from "axios";
import {IUserSignInResponse} from "../entity/user.ts";
import {axiosInstance} from "../axios-instance.ts";
import {IOAuthSignInRequest} from "../entity/oauth.ts";

class OAuthService {
	private url: string = `${import.meta.env.VITE_IAM_BACKEND}/v2/oauth`

	oAuthLogin(data: IOAuthSignInRequest): Promise<AxiosResponse<IUserSignInResponse>> {
		return axiosInstance.post(`${this.url}/login`, data)
	}
}

export const oAuthService = new OAuthService();