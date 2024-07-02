import { Link } from "react-router-dom";
import { DEPARTEMENT } from "../data/departement";

function Dashboard() {
  return (
    <div className="relative h-screen">
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
          <Link to="/login">
            <img
              className="h-[5rem] 2xl:h-[5.8rem]"
              src="/logo.png"
              alt="logo"
            />
          </Link>
        </header>
        <main className="flex-1 px-[9.5rem]  2xl:py-[2rem] flex items-center">
          <div className="grid grid-cols-4 gap-x-10 2xl:gap-x-12 gap-y-12 2xl:gap-y-20 w-full">
            {DEPARTEMENT.map((dep) => (
              <DepartmentLink key={dep.label} data={dep} />
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

function DepartmentLink({ data: { link, label } }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={link}
      className="flex uppercase flex-col items-center gap-2 justify-center border-[1.5px] border-colorGreyText py-4 px-3 text-colorGreyText hover:bg-colorBrand transition-all hover:text-colorWhite hover:border-colorBrand hover:-translate-y-2 hover:shadow-xl focus:shadow-sm focus:-translate-y-1"
    >
      <span className="font-extrabold text-[1.5rem] 2xl:text-[1.6rem] leading-[1]">
        {label}
      </span>
      <span className="text-[1.4rem] 2xl:text-[1.5rem] font-light leading-[1]">
        center
      </span>
    </a>
  );
}
