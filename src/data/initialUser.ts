import { User } from "@/interfaces/User/User";

export function initialUser(): User {
  return {
    id: 0,
    name: "Andressa Urach",
    email: "andressa.urach@example.com",
    document: "123.456.789-00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIfu4xh1Dn0bEoRU1lq0p90pprLCTr1oFbZw&s",
  };
}
