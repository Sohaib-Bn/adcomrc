import { useMutation } from "@tanstack/react-query";
import { singupUser } from "../../services/ApiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: singupUser,
    onSuccess: () => {
      toast.success("Employee have sucessfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, signup };
}
