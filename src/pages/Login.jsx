import { useState } from "react";
import { useAuthContext } from "../ui/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const {
    username,
    setUsername,
    password,
    setPassword,
    login,
    isAuthenticated,
  } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <img
          className="h-[14rem] 2xl:h-[18rem] absolute left-0 top-0"
          src="/public/Untitled-1.png"
          alt="bg"
        />
        <img
          className="h-screen absolute right-0 top-0"
          src="/public/Untitled-3.png"
          alt="bg"
        />
        <img
          className="h-[1.4rem] 2xl:h-[1.6rem] absolute left-[14rem] bottom-[5rem] "
          src="/public/Untitled-4.png"
          alt="bg"
        />
      </div>
      <div className="relative z-10 grid grid-cols-2 items-center gap-x-60 justify-center px-48 h-screen w-full">
        <img
          className="h-[22rem] 2xl:h-[26rem] "
          src="/public/Untitled-2.png"
          alt="bg"
        />
        <div>
          <div className="min-h-[30rem] w-[85%]">
            <h1 className="uppercase text-colorGreyText text-[4.7rem] font-bold text-center mb-10">
              login
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-14">
              <div className="border-b-[2.5px] border-b-colorBrand pb-5 text-xl relative">
                <label
                  className={`font-medium text-colorGreyText absolute transition-all ${
                    isUsernameFocused
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : username
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : "text-[1.6rem]"
                  }`}
                >
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  className="outline-0 relative z-10 bg-transparent text-2xl"
                  type="text"
                  value={username}
                />
              </div>
              <div className="border-b-[2.5px] border-b-colorBrand pb-5 text-xl relative">
                <label
                  className={` font-medium text-colorGreyText absolute transition-all ${
                    isPasswordFocused
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : password
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : "text-[1.6rem]"
                  }`}
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="outline-0 relative z-10 bg-transparent text-2xl"
                  type="password"
                />
                {!isAuthenticated && (
                  <p className="font-midium text-[1.1rem] absolute -bottom-10 pl-2 text-colorError">
                    Password is incorrect
                  </p>
                )}
              </div>

              <button className="mt-[0.9rem] rounded-full w-[80%] m-auto p-4 bg-colorBrand font-semibold text-3xl text-colorWhite transition-all hover:bg-colorBrandHover">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
