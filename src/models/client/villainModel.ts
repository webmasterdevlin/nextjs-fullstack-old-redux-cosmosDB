import { ApiResponse } from "src/features/villains/villainTypes";

export interface IVillainModel extends ApiResponse {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
}
