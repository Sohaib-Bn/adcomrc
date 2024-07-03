import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCenters as updateCentersApi } from "../services/ApiCenters";
import toast from "react-hot-toast";

export function useUpdateCenters() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateCenters } = useMutation({
    mutationFn: updateCentersApi,
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidate and refetch all queries
      toast.success("Url have been successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCenters, isPending };
}
