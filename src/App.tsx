import './App.css'
import {AppRouter} from "./pages/common-routes.tsx";
import {AuthProvider} from "./components/auth/auth-provider/auth-provider.tsx";
import {ModalParent} from "./components/shared-ui/modal/modal/modalParent.tsx";
import {DynamicBackground} from "./components/shared-ui";

function App() {
	return (
		<>
			<AuthProvider>
				<AppRouter/>
			</AuthProvider>
			<ModalParent id="modal-parent"/>
			<DynamicBackground bgText="ISSA"/>
		</>
	)
}

export default App
