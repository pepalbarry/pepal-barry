import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleOAuth from "../services/GoogleOAuth";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle normal register
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("http://localhost:5000/api/auth/register", data, {
        withCredentials: true,
      });
      console.log("Register success:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <GoogleOAuth />
        </div>
      </div>
    </div>
  );
}
