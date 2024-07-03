import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useCenters } from "./useCenters";

import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { useUpdateCenters } from "./useUpdateCenters";
import { useSignup } from "./useSignup";
import { useUpdateUser } from "./useUpdateUser";

function Admin() {
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isLoading } = useCenters();
  const { isPending, updateUser } = useUpdateUser();

  const handleSubmit = function (e) {
    e.preventDefault();
    updateUser(
      { password: adminPassword },
      {
        onSuccess: () => setAdminPassword(""),
      }
    );
  };

  return (
    <div>
      <header className="py-6 px-14 flex items-center justify-between border-[1px]">
        <Link to="/">
          <img className="h-[4rem] 2xl:h-[5.8rem]" src="/logo.png" alt="logo" />
        </Link>
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <div className="relative">
            <input
              placeholder="new password"
              onChange={(e) => setAdminPassword(e.target.value)}
              className="px-4 py-[0.7rem] text-[1.3rem] bg-gray-100 outline-0"
              type={showPassword ? "text" : "password"}
              value={adminPassword}
            ></input>
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-colorGreyText "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            disabled={!adminPassword || isPending}
            className="h-full text-lg rounded-md px-4 py-[0.7rem] bg-colorBrand font-semibold block text-colorWhite transition-all hover:bg-colorBrandHover text-[1.3rem]"
          >
            change
          </button>
        </form>
      </header>
      <div className="py-4 px-14 flex gap-40 justify-center">
        {isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <>
            <Signup />
            <Centers />
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;

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
              className="w-5 h-5"
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

function Centers() {
  const { centers, isLoading } = useCenters();
  const [currUrl, setCurrUrl] = useState("");
  const [currId, setCurrId] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const { isPending: isUpdating, updateCenters } = useUpdateCenters();

  useEffect(() => {
    if (!currUrl && centers && centers.length > 0) {
      setCurrUrl(centers[0].url);
      setCurrId(centers[0].id);
      // setNewUrl(centers[0].url); // Initialize newUrl with the current URL
    }
  }, [currUrl, centers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currId);
    updateCenters(
      { id: currId, url: newUrl },
      {
        onSuccess: () => {
          setNewUrl("");
          setCurrUrl(newUrl);
          // setCurrId(centers[0].id);
        },
      }
    );
  };

  return (
    <div className="admin">
      <h1 className="font-medium text-5xl text-colorGreyText mb-8">Centers</h1>
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="security">
          <div className="mb-6">
            <label htmlFor="center" className="text-xl mb-3 block">
              Select what you want to change
            </label>

            <select
              id="center"
              disabled={isLoading}
              onChange={(e) => {
                setCurrUrl(e.target.value.split("|")[0]);
                setCurrId(e.target.value.split("|")[1]);
              }}
              className="px-5 py-3 text-[1.3rem] w-[30rem] bg-gray-100 outline-0 mb-2"
              value={`${currUrl}|${currId}`}
            >
              {centers?.map((center) => (
                <option key={center.id} value={`${center.url}|${center.id}`}>
                  {center.name}
                </option>
              ))}
            </select>
            <p>{currUrl}</p>
          </div>

          <div>
            <label htmlFor="url" className="text-xl mb-3 block">
              New Url
            </label>
            <input
              id="url"
              disabled={isLoading}
              onChange={(e) => setNewUrl(e.target.value)}
              className="px-5 py-3 text-[1.3rem] w-[30rem] bg-gray-100 outline-0 mb-2"
              type="text"
              value={newUrl}
            />
          </div>
          <button
            disabled={!newUrl || isLoading || isUpdating}
            className="mt-4 h-full text-lg rounded-md px-4 py-[0.7rem] bg-colorBrand font-semibold text-colorWhite transition-all hover:bg-colorBrandHover text-[1.3rem] flex items-center gap-3"
          >
            change {isUpdating && <SpinnerMini />}
          </button>
        </form>
      </div>
    </div>
  );
}
