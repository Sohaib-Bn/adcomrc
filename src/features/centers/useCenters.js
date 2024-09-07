import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../../services/ApiCenters";
import { useUser } from "../authentication/useUser";
import { useAppContext } from "../../context/AppContext";

export function useCenters() {
  const { market, activity } = useAppContext();
  const { jobTitle } = useUser();

  const { data: centers, isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: () => getCenters(jobTitle, market, activity),
  });
  return { centers, isLoading };
}
