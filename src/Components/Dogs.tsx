// Right now these dogs are constant, but in reality we should be getting these from our server
import { Requests } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../context";
import { DogCard } from "./DogCard";
import { Dog, SelectedState } from "../types";
import toast from "react-hot-toast";
import { useDogsQuery } from "../use-dogs-query";

export const Dogs = () => {
  const { selected } = useAppContext();
  const dogsQuery = useDogsQuery();
  const { data, isLoading, isError, error } = dogsQuery;
  const queryClient = useQueryClient();

  const addFavorite = useMutation({
    mutationFn: async ({
      dogId,
      isFavorite,
    }: {
      dogId: Dog["id"];
      isFavorite: boolean;
    }) => {
      return await Requests.patchFavoriteForDog({
        dogId,
        isFavorite,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dogs"],
      });
      toast.success("Added to favorites!");
    },
    onError: () => {
      toast.error("Error adding to favorites!");
    },
  });

  const deleteDog = useMutation({
    mutationFn: async (dogToDelete: Dog["id"]) => {
      return await Requests.deleteDogRequest(dogToDelete);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dogs"],
      });
      toast.success("Deleted dog!");
    },
    onError: () => {
      toast.error("Error adding to favorites!");
    },
  });

  if (isError) return <div>Error: {!!error ?? "Error"}</div>;

  return (
    <>
      {(data as Dog[])?.map((dog: Dog) => {
        if (selected === SelectedState.Favorited && !dog.isFavorite)
          return null;
        if (selected === SelectedState.Unfavorited && dog.isFavorite)
          return null;

        return (
          <DogCard
            key={dog.id}
            dog={dog}
            onTrashIconClick={() => deleteDog.mutate(dog.id)}
            onEmptyHeartClick={() =>
              addFavorite.mutate({
                dogId: dog.id,
                isFavorite: true,
              })
            }
            onHeartClick={() =>
              addFavorite.mutate({
                dogId: dog.id,
                isFavorite: false,
              })
            }
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
