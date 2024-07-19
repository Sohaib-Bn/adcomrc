import { useEffect, useMemo, useState } from "react";
import { useCenters } from "./useCenters";
import { useUpdateCenters } from "./useUpdateCenters";

import SpinnerMini from "../../ui/SpinnerMini";

function UpdateCenters() {
  // const { centers, isLoading } = useCenters();
  const { isLoading, centers } = { centers: [], isLoading: false };
  const [currUrl, setCurrUrl] = useState("");
  const [currId, setCurrId] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const { isPending: isUpdating, updateCenters } = useUpdateCenters();

  const centersLink = useMemo(() => {
    return centers?.filter((center) => center.type !== "button");
  }, [centers]);

  useEffect(() => {
    if (!currUrl && centersLink && centersLink.length > 0) {
      setCurrUrl(centersLink[0].url);
      setCurrId(centersLink[0].id);
      // setNewUrl(centers[0].url); // Initialize newUrl with the current URL
    }
  }, [currUrl, centersLink]);

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
              {centersLink?.map((center) => (
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

export default UpdateCenters;
