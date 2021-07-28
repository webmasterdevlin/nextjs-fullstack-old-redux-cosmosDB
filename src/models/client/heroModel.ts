import { ApiResponse } from "src/features/heroes/heroTypes";

export interface IHeroModel extends ApiResponse {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
}
