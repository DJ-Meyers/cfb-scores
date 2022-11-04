import { Team } from "./teams";

export interface Game {
    id?: number,
    season?: number,
    startDate: string,
    homePoints: number,
    homeTeam: string,
    awayPoints: number,
    awayTeam: string,
}