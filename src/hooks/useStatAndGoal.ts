import { useQuery } from "@tanstack/react-query";
import { getStatAndGoal } from "../api/getStatAndGoal";

export function useStatAndGoal(tgId: number) {
  return useQuery({
    queryKey: ["statAndGoal", tgId],
    queryFn: () => getStatAndGoal(tgId),
  });
}