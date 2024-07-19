import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../../services/ApiCenters";

export function useCenters(jobTitle) {
  const { data: centers, isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: () => getCenters(jobTitle),
  });
  return { centers, isLoading };
}
