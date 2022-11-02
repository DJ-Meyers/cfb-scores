import { Game } from "../../data/game";
import { Team, teams } from "../../data/teams";

export const shuffleGames = (games: Game[]) => {
    let currentIndex = games.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [games[currentIndex], games[randomIndex]] = [
            games[randomIndex],
            games[currentIndex],
        ];
    }

    return games.slice(0, 3);
}

export const getAbbr = (teamName: string) => {
    const team: Team | undefined = teams.find((t) => t.school === teamName);
    if (team) {
        return team.alt_name2;
    } else {
        return 'N/A';
    }
}

export const safeDivide = (numerator: number, divisor: number) => {
    if (divisor === 0)
        return 0;    

    return numerator / divisor;
}

export const percent = (num: number) => {
    return `${(num * 100).toFixed(0)}%`
}