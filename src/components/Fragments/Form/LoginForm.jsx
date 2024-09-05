import { useEffect, useState } from "react";
import { Alert, Label, TextInput } from "flowbite-react";
import { FaRegUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { ButtonFunc } from "../../Elements/Buttons/ButtonFunc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiInformationCircle } from "react-icons/hi";
import { LoginUser, reset } from "../../../redux/slice/authSlice";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    if (!username || !password)
      return setErrorLogin("Username dan Password harus diisi");
    setTimeout(() => {
      dispatch(LoginUser({ username, password }));
    }, 1500);
  };

  useEffect(() => {
    if (user && user.role === "superadmin" && isSuccess) {
      navigate("/admin/dashboard");
      // dispatch(reset());
    }
  }, [user, isSuccess, navigate, dispatch]);

  console.log(user);

  return (
    <>
      {isError && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          onDismiss={() => setErrorLogin(null)}
          className="mt-5"
        >
          <span className="font-medium">{message || errorLogin}</span>
        </Alert>
      )}

      <form className="w-full max-w-md pt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center gap-[5px]">
              <FaRegUserCircle />
              <Label
                htmlFor="username"
                value="Username"
                className="inline-block text-base"
              />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="admin ganteng"
              className="text-base"
              required={true}
              autoFocus={true}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center gap-[5px]">
              <GrSecure />
              <Label
                htmlFor="password"
                value="Password"
                className="text-base"
              />
            </div>
            <div className="relative flex items-center overflow-hidden">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full overflow-hidden text-base"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                className="absolute right-1 p-3 backdrop-blur-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <ButtonFunc type="submit" className={`bg-primary`}>
            Submit
          </ButtonFunc>
          <Link to={"/"}></Link>
        </div>
      </form>
    </>
  );
};
