import { Alert, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonFunc } from "../../Elements/Buttons/ButtonFunc";

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

      <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={submitLogin}>
        <div className="col-span-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <TextInput
            id="username"
            type="text"
            placeholder="Masukkan username"
            className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700"
            required={true}
            autoFocus={true}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="absolute right-1 p-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <ButtonFunc
            type="submit"
            className="focus:ring-3 focus:outline-hidden inline-block w-full rounded-md border border-primary bg-primary px-16 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary md:w-fit"
          >
            Masuk
          </ButtonFunc>
        </div>
      </form>
    </>
  );
};
