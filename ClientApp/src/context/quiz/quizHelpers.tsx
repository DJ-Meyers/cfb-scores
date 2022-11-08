import { Game } from "../../data/game";
import { Team, teams } from "../../data/teams";

export const shuffleGames = (games: Game[], length: number): Game[] => {
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

    return games.slice(0, length);
}

export const getAbbr = (teamName: string): string => {
    const team: Team | undefined = teams.find((t) => t.school === teamName);
    if (team) {
        return team.alt_name2;
    } else {
        return teamName;
    }
}

export const safeDivide = (numerator: number, divisor: number): number => {
    if (divisor === 0)
        return 0;    

    return numerator / divisor;
}

export const percent = (num: number): string => {
    return `${(num * 100).toFixed(0)}%`
}

// const getColors = (team: Team): [string, string] => {
//     return [team.color, team.alt_color];
// }

// const hexToRgb = (hex: string): [number, number, number] => {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? [
//         parseInt(result[1], 16),
//         parseInt(result[2], 16),
//         parseInt(result[3], 16)
//     ] : [0, 0, 0];
// }

// const colors = {
//     '🟥': { r: 255, g: 0, b: 0 },
//     '🟧': { r: 204, g: 102, b: 0 },
//     '🟨': { r: 255, g: 255, b: 0 },
//     '🟩': { r: 0, g: 255, b: 0 },
//     '🟦': { r: 0, g: 0, b: 255 },
//     '🟪': { r: 153, g: 0, b: 255 },
//     '🟫': { r: 153, g: 51, b: 0 },
//     '⬛': { r: 0, g: 0, b: 0 },
//     '⬜': { r: 255, g: 255, b: 255 },
// }

// const getEmojiFromHex = (hex: string): string => {
//     const [ r, g, b ] = hexToRgb(hex);
//     const colorDiffs = [];

//     // TODO: Calc distance
//     return '';
// }

// export const getEmojiColors = (teamName: string): string => {
//     const team: Team | undefined = teams.find((t) => t.school === teamName);
//     if (!team) {
//         return getAbbr(teamName);
//     }
//     const [primary, secondary] = getColors(team);

//     return `${getEmojiFromHex(primary)}${getEmojiFromHex(secondary)}`;
// }