import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa6";
import { useLogin } from "../features/authentication/useLogin";
import SpinnerMini from "../ui/SpinnerMini";

function Login() {
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, login } = useLogin();

  const handleSubmit = function (e) {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
        onError: () => {
          setPassword("");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <img
          className="h-[13rem] 2xl:h-[14rem] absolute left-0 top-0"
          src="/Untitled-1.png"
          alt="bg"
        />
        <img
          className="h-screen absolute right-0 top-0"
          src="/Untitled-3.png"
          alt="bg"
        />
        <img
          className="h-[1.4rem] 2xl:h-[1.4rem] absolute left-[11rem] bottom-[4rem] "
          src="/Untitled-4.png"
          alt="bg"
        />
      </div>
      <div className="relative z-10 grid grid-cols-2 items-center gap-x-60 justify-center px-40 2xl:px-48 h-screen w-full">
        <img
          className="h-[22rem] 2xl:h-[26rem] "
          src="/Untitled-2.png"
          alt="bg"
        />
        <div>
          <div className="min-h-[30rem] 2xl:w-[75%]">
            <h1 className="uppercase text-colorGreyText text-[4.2rem] 2xl:text-[4.7rem] font-bold text-center mb-10 -translate-x-7">
              login
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-14">
              <div className="border-b-[2.5px] border-b-colorBrand pb-4 text-xl relative">
                <label
                  className={`font-medium text-colorGreyText absolute transition-all ${
                    isUsernameFocused
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : email
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : "text-[1.55rem]"
                  }`}
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  className="outline-0 relative z-10 bg-transparent text-xl w-full"
                  type="text"
                  value={email}
                />
                <span className="absolute right-0 top-2 text-colorBrand pr-2 ">
                  <FaUser />
                </span>
              </div>
              <div className="border-b-[2.5px] border-b-colorBrand pb-5 text-xl relative">
                <label
                  className={` font-medium text-colorGreyText absolute transition-all ${
                    isPasswordFocused
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : password
                      ? "text-[1.3rem] translate-y-[-27px]"
                      : "text-[1.55rem]"
                  }`}
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="outline-0 relative z-10 bg-transparent text-xl w-full"
                  type="password"
                />
                <span className="absolute right-0 top-2 text-colorBrand pr-2 text-md">
                  <FaLock />
                </span>
                {/* {!isAuthenticated && (
                  <p className="font-midium text-[1.1rem] absolute -bottom-10 pl-2 text-colorError">
                    Password is incorrect
                  </p>
                )} */}
              </div>

              <button
                disabled={!email || !password || isPending}
                className="mt-[0.5rem] rounded-full w-[75%] m-auto px-4 py-3 bg-colorBrand font-semibold text-[2rem] text-colorWhite transition-all hover:bg-colorBrandHover flex items-center justify-center gap-3"
              >
                Login {isPending && <SpinnerMini />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
