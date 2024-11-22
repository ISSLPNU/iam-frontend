import {IUser} from "../../../api/entity/user.ts";
import {devtools, persist} from "zustand/middleware";
import {create} from "zustand";

type UserStoreType = {
	userDetails?: IUser;
	token?: string;
	authenticated: boolean;
	setUserDetails: (user: IUser) => void;
	setUserToken: (token: string) => void;
	logout: () => void;
}

export const useUserStore = create<UserStoreType>()(
	devtools(
		persist(
			(set) => ({
				authenticated: false,

				setUserDetails: (user: IUser) => {
					set({ userDetails: user });
				},
				setUserToken: (token: string) => {
					set({ token, authenticated: !!token });
					localStorage.setItem("userToken", token);
				},
				logout: () => {
					set({ token: undefined, userDetails: undefined, authenticated: false });
					localStorage.removeItem("userToken");
				},
			}),
			{
				name: "user-details-storage",
			}
		)
	)
);

