import { Link } from "react-router-dom";
import SpinnerFullPage from "../ui/SpinnerFullPage";
import { useCenters } from "./useCenters";
import { useUser } from "./useUser";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "./useLogout";

function Dashboard() {
  const { centers, isLoading } = useCenters();
  const { isAdmin } = useUser();

  const { isPending, logout } = useLogout();

  if (isLoading) return <SpinnerFullPage />;
  return (
    <div className="relative h-screen">
      <div className="flex flex-col gap-2 absolute z-20 right-6 top-5">
        {isAdmin && (
          <Link
            to="/admin"
            className="text-3xl text-colorBrand hover:translate-x-2 transition-all"
          >
            &rarr;
          </Link>
        )}
        <button
          disabled={isPending}
          onClick={logout}
          className="text-3xl text-colorBrand hover:translate-x-2 transition-all"
        >
          <CiLogout />
        </button>
      </div>
      <div>
        <img
          className="h-[16rem] 2xl:h-[20rem] absolute left-0 top-0"
          src="/Untitled-5.png"
          alt="bg"
        />
        <img
          className="h-[4rem] 2xl:h-[6rem] absolute right-[6.5rem] top-[3rem] 2xl:top-[4.3rem]"
          src="/Untitled-6.png"
          alt="bg"
        />
        <img
          className="h-screen absolute right-0 top-0"
          src="/Untitled-3.png"
          alt="bg"
        />
        <img
          className="h-[2rem] 2xl:h-[2.3rem] absolute right-[8rem] 2xl:right-[5.8rem] bottom-[2.5rem] 2xl:bottom-[6rem]"
          src="/Untitled-7.png"
          alt="bg"
        />
        <img
          className="h-[1.4rem] 2xl:h-[1.6rem] absolute left-[8rem] bottom-[4rem] 2xl:bottom-[7rem]"
          src="/Untitled-4.png"
          alt="bg"
        />
      </div>
      <div className="z-10 relative h-screen flex flex-col">
        <header className="flex items-center justify-center px-3 py-[3rem] 2xl:py-[3.9rem]">
          <Link to="/">
            <img
              className="h-[5rem] 2xl:h-[5.8rem]"
              src="/logo.png"
              alt="logo"
            />
          </Link>
        </header>
        <main className="flex-1 px-[9.5rem]  2xl:py-[2rem] flex items-center">
          <div className="grid grid-cols-4 gap-x-10 2xl:gap-x-12 gap-y-12 2xl:gap-y-20 w-full">
            {centers.map((center) => (
              <CenterLink key={center.id} data={center} />
            ))}
          </div>
        </main>
        <footer className="flex items-center justify-center px-3 p-[3rem]">
          <div className="border-b-8 border-colorBrand leading-[1]">
            <h1 className="uppercase font-bold 2xl:text-[4.8rem] text-[4.3rem] text-colorGreyText">
              system
            </h1>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;

function CenterLink({ data: { name, url } }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={url}
      className="flex uppercase flex-col items-center gap-2 justify-center border-[1.5px] border-colorGreyText py-4 px-3 text-colorGreyText hover:bg-colorBrand transition-all hover:text-colorWhite hover:border-colorBrand hover:-translate-y-2 hover:shadow-xl active:shadow-sm active:-translate-y-1"
    >
      <span className="font-extrabold text-[1.5rem] 2xl:text-[1.6rem] leading-[1]">
        {name}
      </span>
      <span className="text-[1.4rem] 2xl:text-[1.5rem] font-light leading-[1]">
        center
      </span>
    </a>
  );
}
