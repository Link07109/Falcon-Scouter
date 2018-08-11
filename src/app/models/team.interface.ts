export interface Team {
    // TODO: maybe add the attempted versions of auto?
    teamNumber: any;
    startingPosition: string; // could maybe use this for "which one do they prefer more"
    autoRunPercent: boolean; // 50% = they crossed the baseline in 50% of their games
    autoSwitchPercent: boolean; // 50% = they got at least 1 auto switch cube in 50% of their games
    avgAutoSwitchCubes: number;
    autoScalePercent: boolean; // 50% = they got at least 1 auto scale cube in 50% of their games
    avgAutoScaleCubes: number;
    avgSwitchCubes: number;
    avgSwitchFailedCubes: number;
    avgScaleCubes: number;
    avgScaleFailedCubes: number;
    avgExchangeCubes: number;
    climbPercent: string; // 50% = they climbed in 50% of their games
}
