import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useCenters } from "../features/centers/useCenters";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import { IoArrowBack } from "react-icons/io5";
// import { RiDashboardFill } from "react-icons/ri";
// import { TiHome } from "react-icons/ti";
// import { TiArrowBack } from "react-icons/ti";
// import { IoReturnDownBackSharp } from "react-icons/io5";
// import { GrReturn } from "react-icons/gr";

import Spinner from "../ui/Spinner";
import Signup from "../features/authentication/Signup";
import UpdateCenters from "../features/centers/UpdateCenters";

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
    <div className="adminDashbord">
      <header className="py-6 px-[9rem] flex items-center justify-between border-[1px]">
        <Link
          to="/"
          className="text-4xl flex justify-end text-colorBrand hover:-translate-x-2 transition-all"
        >
          {/* <img className="h-10" src="/public/favicon.png" alt="home" /> */}
          <IoArrowBack />
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
      <div className="py-4 px-[9rem] flex gap-40">
        {isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <>
            <Signup />
            <UpdateCenters />
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
