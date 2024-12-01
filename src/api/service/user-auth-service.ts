import {axiosInstance} from "../axios-instance.ts";
import {
	IUserSignUp,
	IUserRestorePasswordRequest,
	IUserSignIn,
	IAuthenticationActionRequest,
	IUserSignInResponse, IUserRestorePassword
} from "../entity/user.ts";
import {AxiosResponse} from "axios";


class UserAuthService {
	private url: string = `${import.meta.env.VITE_IAM_BACKEND}/authentication`

	signIn(data: IUserSignIn): Promise<AxiosResponse<IUserSignInResponse>> {
		return axiosInstance.post(`${this.url}/singIn`, data)
	}

	singUp(data: IUserSignUp): Promise<AxiosResponse<void>> {
		return axiosInstance.post(`${this.url}/singUp`, data)
	}

	restorePassword(data: IUserRestorePasswordRequest): Promise<AxiosResponse<void>>  {
		return axiosInstance.post(`${this.url}/restorePassword`, data)
	}

	confirmSignUp(data: IAuthenticationActionRequest): Promise<AxiosResponse<void>>  {
		return axiosInstance.post(`${this.url}/action/confirmSignUp`, data)
	}

	twoFactorConfirm(data: IAuthenticationActionRequest): Promise<AxiosResponse<void>>  {
		return axiosInstance.post(`${this.url}/action/twoFactorConfirm`, data)
	}

	restorePasswordConfirm(data: IUserRestorePassword): Promise<AxiosResponse<void>>  {
		return axiosInstance.post(`${this.url}/action/restorePasswordConfirm`, data)
	}
}

export const userAuthService = new UserAuthService()
