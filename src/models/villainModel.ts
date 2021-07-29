import { ApiResponse } from "src/features/heroes/heroTypes";

export interface IVillainModel extends ApiResponse {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
}
