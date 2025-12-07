import { type IPlayer } from "@varandas/clash-royale-api/lib/interfaces/player.interface.js";

export function isPlayerKey(key: string): key is keyof IPlayer {
    const validKeys: Array<keyof IPlayer> = [
        'tag', 'name', 'expLevel', 'trophies', 'bestTrophies',
        'wins', 'losses', 'battleCount', 'threeCrownWins',
        'challengeCardsWon', 'challengeMaxWins', 'tournamentCardsWon',
        'tournamentBattleCount', 'donations', 'donationsReceived',
        'totalDonations', 'warDayWins', 'clanCardsCollected', 'arena',
        'badges', 'achievements', 'cards', 'supportCards', 'currentDeck',
        'currentDeckSupportCards', 'currentFavouriteCard', 'starPoints',
        'expPoints', 'legacyTrophyRoadHighScore',
        'currentPathOfLegendSeasonResult', 'lastPathOfLegendSeasonResult',
        'bestPathOfLegendSeasonResult', 'totalExpPoints'
    ];
    return validKeys.includes(key as keyof IPlayer);
}
