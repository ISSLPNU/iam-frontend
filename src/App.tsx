import './App.css'
import {AppRouter} from "./pages/common-routes.tsx";
import {AuthProvider} from "./components/auth/auth-provider/auth-provider.tsx";
import {ModalParent} from "./components/shared-ui/modal/modal/modalParent.tsx";
import {DynamicBackground} from "./components/shared-ui";
import {ToastContainer} from "react-toastify";

function App() {
	return (
		<>
			<AuthProvider>
				<AppRouter/>
			</AuthProvider>
			<ModalParent id="modal-parent"/>
			<DynamicBackground bgText="ISSLIAM"/>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme="dark"
			/>
		</>
	)
}

export default App
