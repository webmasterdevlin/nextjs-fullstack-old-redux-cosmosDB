import axios from "axios";

export const api = axios.create();

export const EndPoints = {
  heroes: "/api/heroes",
  villains: "/api/villains",
};
