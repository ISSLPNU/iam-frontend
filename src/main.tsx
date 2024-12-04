import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_IAM_GOOGLE_OAUTH_CLIENT_ID}>
      <App/>
    </GoogleOAuthProvider>
  </QueryClientProvider>,
)
