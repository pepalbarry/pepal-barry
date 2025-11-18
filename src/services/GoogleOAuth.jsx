import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const responseGoogle = async (tokenResponse) => {
    if (!tokenResponse?.code) {
      console.error("No auth code received");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const googleAuthRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
        { code: tokenResponse.code }
      );

      const { token, user } = googleAuthRes.data || {};

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      } else {
        console.error("Invalid response from server:", googleAuthRes.data);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google Login Failed:", error);
      setLoading(false);
    },
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => {
        setLoading(true);
        googleLogin();
      }}
      disabled={loading}
      className={`w-full border-2 border-purple-500 text-purple-500 py-2 px-4 rounded transition-colors ${
        loading
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-purple-500 hover:text-white"
      }`}
    >
      {loading ? "Logging in..." : "Login with Google"}
    </button>
  );
};

export default GoogleOAuth;
