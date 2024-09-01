import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { FaRegUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { ButtonFunc } from "../../Elements/Buttons/ButtonFunc";
import { Link } from "react-router-dom";

export const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
    console.log(username, password);
  };

  return (
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
            <Label htmlFor="password" value="Password" className="text-base" />
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
  );
};
