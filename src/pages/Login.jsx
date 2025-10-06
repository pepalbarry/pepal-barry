// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import GoogleOAuth from "../services/GoogleOAuth";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { register,setError, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const {setUser} = useAuth();
    
  const onSubmit =async (data) => {
       try {
      console.log(data);
      const res = await axios.post("http://localhost:5000/api/auth/login", data, {
        withCredentials: true,
      });
      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err.response?.data.message || err.message);
      setError("server",err.response?.data.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          NutriGren Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

       <GoogleOAuth />

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
