import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from "../store/slices/authSlice";
import { RootState } from "../store";

type FormValues = {
  username: string
  password: string
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (auth.token) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (formData: FormValues) => {
    if (formData.username === "user" && formData.password === "user123") {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE3MTgxNDM1NDB9.VOeyW-SkDTG5bCeJienxQAZcFJ5fOuIbpY2-D1zDkvE';
      dispatch(signIn(token));
      navigate("/products");
    } else {
      toast.error('Username or password is incorrect', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center px-6 py-12">
        <h2 className="mt-10 text-center text-2xl font-bold">
          Sign in to your account
        </h2>

        <div className="mt-10 mx-auto w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                />
              </div>
              {errors?.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>

            <div>
              <label htmlFor="password">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
              </div>
              {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
