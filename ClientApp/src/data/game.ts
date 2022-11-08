import { Team } from "./teams";

export interface Game {
    Id?: number,
    Season?: number,
    StartDate: string,
    HomePoints: number,
    HomeTeam: string,
    AwayPoints: number,
    AwayTeam: string,
}