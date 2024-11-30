import {PropsWithChildren} from "react";
import {useUserStore} from "../store/user-store.tsx";
import {AuthContext} from "../auth-context.tsx";
import {useShallow} from "zustand/react/shallow";

export const AuthProvider = ({children}: AuthProviderProps) => {
	const {user, authenticated, logout} = useUserStore(
		useShallow((state) => ({
			user: state.userDetails,
			authenticated: state.authenticated,
			logout: state.logout
		})));

	return (
		<AuthContext.Provider value={{user, isAuthenticated: () => authenticated, logout}}>
			{children}
		</AuthContext.Provider>
	)
}

type AuthProviderProps = {} & PropsWithChildren;
