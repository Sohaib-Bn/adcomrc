import { useQuery } from "@tanstack/react-query";
import { getJobsTitle } from "../../services/ApiJobsTitles";

export function useJobsTitle() {
  const { isLoading, data: jobsTitle } = useQuery({
    queryKey: ["jobsTitle"],
    queryFn: getJobsTitle,
  });

  return { isLoading, jobsTitle };
}
