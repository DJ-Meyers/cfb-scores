import { safeParseStat } from "../context/quiz/quizHelpers";

export interface StatTable {
    homeTeam: string,
    awayTeam: string,
    statRows: StatRow[]
}

export interface StatRow {
    category: string,
    home: string,
    away: string,
}

export interface Stat {
    category: string,
    value: string,
}

export interface DesiredStats {
    stats: Stat[],
}

export interface TeamGameStats {
    Category: string,
    Stat: string
}

export const createStatTable = (home: string, homeStats: DesiredStats, away: string, awayStats: DesiredStats): StatTable => {
    const table: StatTable = { homeTeam: home, awayTeam: away, statRows: [] };
    homeStats.stats.forEach((stat: Stat) => {
        let statRow: StatRow | undefined = table.statRows.find((sr) => sr.category === stat.category);
        if (!statRow) {
            statRow = { category: stat.category, home: "N/A", away: "N/A" };
            table.statRows.push(statRow);
        }
        statRow.home = stat.value;
    });

    awayStats.stats.forEach((stat: Stat) => {
        let statRow: StatRow | undefined = table.statRows.find((sr) => sr.category === stat.category);
        if (!statRow) {
            statRow = { category: stat.category, home: "N/A", away: "N/A" };
            table.statRows.push(statRow);
        }
        statRow.away = stat.value;
    });

    return table;
}

export const getDesiredStats = (tgs: TeamGameStats[]): DesiredStats => {
    const desiredStats: DesiredStats = { stats: [] };

    const totalYards = tgs.find((stat) => stat.Category === 'totalYards');
    if (totalYards) {
        desiredStats.stats.push({ category: 'Yards', value: totalYards.Stat });
    }

    const rushingAtts = tgs.find((stat) => stat.Category === 'rushingAttempts');
    const rushingYards = tgs.find((stat) => stat.Category === 'rushingYards');
    const rushingTDs = tgs.find((stat) => stat.Category === 'rushingTDs');
    if (rushingAtts && rushingYards && rushingTDs) {
        desiredStats.stats.push({ category: 'Rushing', value: `${rushingAtts.Stat}/${rushingYards.Stat}/${rushingTDs.Stat}` });
    }

    const completionAttempts = tgs.find((stat) => stat.Category === 'completionAttempts');
    const passingYards = tgs.find((stat) => stat.Category === 'netPassingYards');
    const passingTDs = tgs.find((stat) => stat.Category === 'passingTDs');
    if (completionAttempts && passingYards && passingTDs) {
        desiredStats.stats.push({ category: 'Passing', value: `${completionAttempts.Stat}/${passingYards.Stat}/${passingTDs.Stat}` });
    }

    const defensiveStats = [];
    
    const tacklesForLoss = tgs.find((stat) => stat.Category === 'tacklesForLoss');
    const sacks = tgs.find((stat) => stat.Category === 'sacks');
    if (tacklesForLoss || sacks) {
        defensiveStats.push(`${safeParseStat(sacks) + safeParseStat(tacklesForLoss)}TFL`);
    }

    const fumbleRecoveries = tgs.find((stat) => stat.Category === 'fumblesRecovered');
    const interceptions = tgs.find((stat) => stat.Category === 'passesIntercepted');
    if (fumbleRecoveries || interceptions) {
        defensiveStats.push(`${safeParseStat(fumbleRecoveries) + safeParseStat(interceptions)}TO`);
    }

    const defensiveTDs = tgs.find((stat) => stat.Category === 'defensiveTDs');
    if (defensiveTDs) {
        defensiveStats.push(`${defensiveTDs.Stat}TD`);
    }
    
    if (defensiveStats.length) {
        desiredStats.stats.push({ category: 'Defense', value: defensiveStats.join("/") });
    }

    const specialTeamsStats = [];
    const korTDs = tgs.find((stat) => stat.Category === 'kickReturnTDs');
    const puntTDs = tgs.find((stat) => stat.Category === 'puntReturnTDs');

    if (korTDs || puntTDs) {
        specialTeamsStats.push(`${safeParseStat(korTDs) + safeParseStat(puntTDs)}TDs`);
    }

    const kickingPoints = tgs.find((stat) => stat.Category === 'kickingPoints');
    if (kickingPoints) {
        specialTeamsStats.push(`${safeParseStat(kickingPoints)}XP+FG`);
    }
    if (specialTeamsStats.length) {
        desiredStats.stats.push({ category: 'ST', value: specialTeamsStats.join("/") });
    }

    return desiredStats;
}

export interface TeamGameTeams {
    School: string,
    Conference: string,
    HomeAway: string,
    Points?: number,
    Stats: TeamGameStats[],
}

export interface TeamGame {
    Id?: number,
    Teams: TeamGameTeams[],
}