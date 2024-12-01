import {IUser} from "../../api/entity/user.ts";
import {createContext, useContext} from "react";

type ContentType = {
	isAuthenticated: () => boolean;
	user?: IUser;
	logout: () => void;
	login: (token: string) => void;
}

export const AuthContext = createContext<ContentType>({
	isAuthenticated(): boolean {
		throw new Error("Method not implemented")
	},
	logout(): void {
		throw new Error("Method not implemented")
	},
	login(): void {
		throw new Error("Method not implemented")
	}
})

export const useAuth = () => useContext(AuthContext)