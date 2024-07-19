import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/ApiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    error,
    jobTitle: user?.user_metadata?.jobTitle,
    isAdmin: user?.user_metadata?.admin,
    isAuthonticated: user?.role === "authenticated",
  };
}
