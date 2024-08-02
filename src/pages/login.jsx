import axios from "axios";
import TitleSection from "../components/Elements/TitleSection";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authLogin } from "../services/auth.service";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { LoginForm } from "../components/Fragments/Form/LoginForm";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(null);
  const navigation = useNavigate();

  const handleSubmit = async (username, password) => {
    try {
      if (!username || !password || (!username && !password)) {
        return setErrorLogin("Isi Username atau password");
      }

      const token = await authLogin(username, password);
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigation("/admin/dashboard");
      } else {
        setErrorLogin("Username atau password salah");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="flex h-screen flex-col items-center justify-center px-10">
        <TitleSection className="max-w-sm px-5 text-center">
          Login Admin Explorer Megalit
        </TitleSection>

        {errorLogin && (
          <Alert
            color="failure"
            icon={HiInformationCircle}
            onDismiss={() => setErrorLogin(null)}
            className="mt-5"
          >
            <span className="font-medium">{errorLogin}</span>
          </Alert>
        )}

        {/* <form className="w-full max-w-md pt-5" onSubmit={handleSubmit}>
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
        </form> */}
        <LoginForm onSubmit={handleSubmit} />

        <Link to={"/"} className="group flex">
          <i>
            <svg
              className="text-transparent transition-all duration-300 group-hover:text-gray-800 group-hover:dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </i>
          <span>Kembali ke halaman utama</span>
        </Link>
      </section>
    </>
  );
}
