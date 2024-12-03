import {PropsWithChildren, useCallback, useEffect} from "react";
import {useUserStore} from "../store/user-store.tsx";
import {AuthContext} from "../auth-context.tsx";
import {useShallow} from "zustand/react/shallow";
import {useUserWhoami} from "../../../api/hook/user/use-user-whoami.tsx";
import {toast} from "react-toastify";

export const AuthProvider = ({children}: AuthProviderProps) => {
	const {user, authenticated, logout, setUserToken, setUser, token} = useUserStore(
		useShallow((state) => ({
			user: state.userDetails,
			authenticated: state.authenticated,
			logout: state.logout,
			token: state.token,
			setUser: state.setUserDetails,
			setUserToken: state.setUserToken
		})));

	const {userWhoami, response: userDetails} = useUserWhoami()

	const login = useCallback((token: string) => {
		setUserToken(token);
	}, [setUserToken])

	useEffect(() => {
		if (token){
			userWhoami()
		}
	}, [token, userWhoami])

	useEffect(() => {
		if (userDetails){
			setUser(userDetails)
		}
	}, [setUser, userDetails]);

	const logoutWrapper = useCallback(() => {
		logout()
		toast.success("Logged out")
	}, [logout])

	return (
		<AuthContext.Provider value={{user, isAuthenticated: () => authenticated, logout: logoutWrapper, login}}>
			{children}
		</AuthContext.Provider>
	)
}

type AuthProviderProps = {} & PropsWithChildren;
