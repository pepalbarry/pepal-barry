import Home from "./pages/Home"
import Login from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter , Routes, Route } from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./context/AuthProvider";
import Register from "./pages/Register";

function App() {
  

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </AuthProvider>
    
  )
}

export default App
