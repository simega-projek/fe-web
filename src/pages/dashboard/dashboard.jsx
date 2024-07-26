import { useLogin } from "../../useHooks/useLogin";

export const Dashboard = () => {
  const username = useLogin();
  console.log(username);
  return (
    <>
      <p>user masuk : {username}</p>
    </>
  );
};
