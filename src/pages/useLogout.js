import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../services/ApiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.resetQueries();
      navigate("/login");
    },
    onError: () => {
      toast.error("Something was wrong. Try again");
    },
  });

  return { isPending, logout };
}
