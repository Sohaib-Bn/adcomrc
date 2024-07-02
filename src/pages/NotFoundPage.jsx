import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <img
          className="h-80"
          src="/undraw_page_not_found_re_e9o6.svg"
          alt="notfound"
        />
        <button
          onClick={() => navigate("system")}
          className="mt-[0.5rem] rounded-lg m-auto px-6 py-3 bg-colorBrand font-semibold text-[1.5rem] text-colorWhite transition-all hover:bg-colorBrandHover flex items-center justify-center gap-4"
        >
          <span>Go back</span>
          <span>&#10229;</span>
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
