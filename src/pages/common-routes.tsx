import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RequireAuth} from "../components/auth/require-auth/require-auth.tsx";
import {authPages, authRoutes} from "./auth/auth-routes.tsx";
import {authActionsRoutes} from "./auth-actions/auth-actions-routes.tsx";


export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RequireAuth unauthenticatedRedirectPath={authPages.signInPage()}/>,
			errorElement: <div>Page not found</div>,
			children: [
				{
				}
			]
		},
		{
			index: false,
			children: authRoutes
		},
		{
			index: false,
			children: authActionsRoutes
		}
	])

	return (
		<RouterProvider router={router}/>
	)
}
