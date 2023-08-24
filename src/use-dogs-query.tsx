import { useQuery } from "@tanstack/react-query";
import { Requests } from "./api";

export const useDogsQuery = () => {
  const dogsQuery = useQuery({
    queryKey: ["dogs"],
    queryFn: Requests.getAllDogs,
  });

  return dogsQuery;
};
