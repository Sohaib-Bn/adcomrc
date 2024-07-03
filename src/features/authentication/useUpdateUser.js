import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/ApiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("Your password successfully changed");
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast.error("There was problem. Try again"),
  });

  return { isPending, updateUser };
}
