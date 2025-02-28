import { useEffect, useState } from "react";
import { Alert, Label, TextInput } from "flowbite-react";
import { FaRegUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { ButtonFunc } from "../../Elements/Buttons/ButtonFunc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiInformationCircle } from "react-icons/hi";

import { sliceAuthLogin } from "../../../redux/actions/authAction";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [messageLogin, setMessageLogin] = useState(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { userData, isLoading, isError } = useSelector((state) => state.auth);

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      setMessageLogin("Isi Username atau password");
    }
    try {
      dispatch(sliceAuthLogin(username, password));
    } catch (err) {
      console.log(err);
      setMessageLogin("Terjadi kesalahan saat login");
    }
  };

  useEffect(() => {
    if (userData?.access_token) {
      navigation("/admin/dashboard");
    }
  }, [userData, navigation]);

  useEffect(() => {
    if (isError) {
      setMessageLogin(isError);
    }
  }, [isError]);

  return (
    <>
      {messageLogin && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          onDismiss={() => setMessageLogin(null)}
          className="mt-5"
        >
          <span className="font-medium">{messageLogin}</span>
        </Alert>
      )}

      <form className="w-full max-w-md pt-5" onSubmit={submitLogin}>
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
              placeholder="username"
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
          <ButtonFunc
            type="submit"
            className={`bg-primary transition-all duration-300 hover:text-white`}
          >
            Submit
          </ButtonFunc>
          <Link to={"/"}></Link>
        </div>
      </form>
    </>
  );
};
