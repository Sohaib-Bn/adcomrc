import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../services/ApiCenters";

export function useCenters() {
  const { data: centers, isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });
  return { centers, isLoading };
}
