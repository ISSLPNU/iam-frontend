import {axiosInstance} from "../axios-instance.ts";
import {
	IUser
} from "../entity/user.ts";
import {AxiosResponse} from "axios";


class UserService {
	private url: string = `${import.meta.env.VITE_IAM_BACKEND}/user`

	whoami(): Promise<AxiosResponse<IUser>> {
		return axiosInstance.get(`${this.url}/whoami`)
	}

	toggleTFA(enabled: boolean): Promise<AxiosResponse<void>> {
		return axiosInstance.patch(`${this.url}/tfa`, null, {params: {enabled}})
	}
}

export const userService = new UserService();
