import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const responseGoogle = async (tokenResponse) => {
    try {
      console.log(tokenResponse.code);
      const googleAuthRes = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { code: tokenResponse.code }
      );
      console.log(googleAuthRes);

      localStorage.setItem("token", googleAuthRes.data.token);
      localStorage.setItem("user", JSON.stringify(googleAuthRes.data.user));
      setUser(googleAuthRes.data.user);
      navigate("/");
    } catch (error) {
      console.error("Error while requesting google code", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="btn btn-outline btn-accent w-full"
    >
      Continue with Google
    </button>
  );
};

export default GoogleOAuth;
