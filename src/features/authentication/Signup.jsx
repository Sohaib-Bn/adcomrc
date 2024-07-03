import { useState } from "react";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

function Signup() {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const { isPending, signup } = useSignup();

  const handleSubmit = function (e) {
    e.preventDefault();
    signup(
      { email: employeeEmail, password: employeePassword, admin: admin },
      {
        onSuccess: () => {
          setEmployeeEmail("");
          setEmployeePassword("");
        },
      }
    );
  };

  return (
    <div className="w-[35%]">
      <h1 className="font-medium text-5xl text-colorGreyText mb-8">
        New employee
      </h1>
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="security flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="text-xl mb-3 block">
              Employee email
            </label>
            <input
              id="email"
              onChange={(e) => setEmployeeEmail(e.target.value)}
              className="px-5 py-3 text-[1.3rem] bg-gray-100 outline-0  w-full"
              type="text"
              value={employeeEmail}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xl mb-3 block">
              Employee password
            </label>
            <input
              id="password"
              onChange={(e) => setEmployeePassword(e.target.value)}
              className="px-5 py-3 text-[1.3rem] bg-gray-100 outline-0 w-full"
              type="password"
              autoComplete="current-password"
              value={employeePassword}
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="admin"
              className="text-lg font-medium text-colorGreyText"
            >
              Admin
            </label>
            <input
              onChange={() => setAdmin((s) => !s)}
              value={admin}
              id="admin"
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
            />
          </div>
          <button
            disabled={!employeeEmail || !employeePassword || isPending}
            className="h-full text-lg rounded-md px-4 py-[0.7rem] bg-colorBrand font-semibold text-colorWhite transition-all hover:bg-colorBrandHover text-[1.3rem] flex justify-center items-center gap-3"
          >
            Add new employee {isPending && <SpinnerMini />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
