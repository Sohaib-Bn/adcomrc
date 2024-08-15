import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../../services/ApiCenters";

export function useCenters(jobTitle, market) {
  const { data: centers, isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: () => getCenters(jobTitle, market),
  });
  return { centers, isLoading };
}
