import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RequireAuth} from "../components/auth/require-auth/require-auth.tsx";
import {authRoutes} from "./auth/auth-routes.tsx";


export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RequireAuth unauthenticatedRedirectPath="/auth/signIn"/>,
			children: [
				{
					index: false,
					children: authRoutes
				}
			]
		}
	])

	return (
		<RouterProvider router={router}/>
	)
}
