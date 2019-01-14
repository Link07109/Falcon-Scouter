export interface Match {
    teamNumber: number
    matchNumber: number
    scoutName: string

    preloadedObject: string
    startingHabPlatformLevel: string
    crossedHabLine: boolean
    sandstormCargoShipAttempt: boolean
    sandstormSwitchCubes: number
    sandstormRocketAttempt: boolean
    sandstormRocketBalls: number
    sandstormRocketHatches: number

    ballsCargoShip: number
    failedBallsCargoShip: number
    hatchesCargoShip: number
    failedHatchesCargoShip: number

    ballsRocket: number
    failedballsRocket: number
    hatchesRocket: number
    failedHatchesRocket: number

    endingHabPlatformLevel: number
    cards: string
    comments: string
}
