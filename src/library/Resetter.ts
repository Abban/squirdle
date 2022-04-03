import resetsResource, {ResetsResource} from "@/library/resetsResource";
import statsResource from "@/library/statsResource";
import {Stats} from "@/entities/Stats";
import {GAME_STATE} from "@/entities/GameState";

class Resetter {
    private daysToReset: Array<Number>;
    private resetsResource: ResetsResource;
    private readonly stats: Stats;

    constructor(daysToReset: Array<Number>, resetsResource: ResetsResource, stats: Stats) {
        this.daysToReset = daysToReset;
        this.resetsResource = resetsResource;
        this.stats = stats;
    }

    shouldResetDay( date: Number, gameState: Object ): boolean {
        if(!this.daysToReset.includes(date)) {
            return false;
        }

        const resets = resetsResource.getResets();

        if(resets.includes(date)) {
            return false;
        }

        resetsResource.addReset(resets, date);

        if(gameState === GAME_STATE.LOST) {
            this.stats.played--;
            statsResource.storeStats(this.stats);
        }
        return true;
    }
}

export default Resetter;