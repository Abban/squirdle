<template>
    <Modal :heading="'Statistics'">
        <div class="status-box" v-if="won || lost" :class="{won: won, lost: lost}">
            <div class="status-box-text" v-if="won">
                <h2>You won!</h2>
                <p>You caught <span class="pokemon">{{ word }}</span>!</p>
            </div>
            <div class="status-box-text" v-if="lost">
                <h2>You lost!</h2>
                <p><span class="pokemon">{{ word }}</span> ran away! Try again tomorrow.</p>
            </div>
            <div class="spread">
                <button class="spread-button" v-on:click="copyShareText">{{ shareButtonText }}</button>
            </div>
        </div>

        <h2>Some Stats</h2>
        <div class="stats">
            <div class="stat">
                <div class="stat-number">
                    {{ stats.played }}
                </div>
                <div class="stat-text">
                    Played
                </div>
            </div>
            <div class="stat">
                <div class="stat-number">
                    {{ stats.won }}
                </div>
                <div class="stat-text">
                    Won
                </div>
            </div>
            <div class="stat">
                <div class="stat-number">
                    {{ stats.played - stats.won }}
                </div>
                <div class="stat-text">
                    Lost
                </div>
            </div>
            <div class="stat">
                <div class="stat-number">
                    {{ percentage(stats.won, stats.played) }}%
                </div>
                <div class="stat-text">
                    % wins
                </div>
            </div>
        </div>
        <hr>
        <h2>Correct Answers</h2>
        <div class="distribution">
            <div class="distribution-row" v-for="(guess, index) in stats.guesses" :key="index">
                <div class="distribution-guesses">
                    {{ index + 1 }}
                </div>
                <div class="distribution-percentage-container">
                    <div class="distribution-percentage" :style="{width: `${percentage(guess, total)}%`}">
                        <div class="distribution-percentage-text">
                            {{ percentage(guess, total) }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <h2>Pokédex</h2>
        <div class="pokedex">
            <div class="pokedex-generation" v-for="(generation, index) in splitGenerations" :key="index">
                <div class="pokedex-generation-title">{{ generations[index].name }}</div>
                <div class="pokedex-item" v-for="(word, wordIndex) in generation" :key="wordIndex"
                     :class="{caught: isCaught(word)}">
                    <div class="pokedex-item-number">{{ pokemonNumber++ }}</div>
                    <div class="pokedex-item-word">{{ getWord(word) }}</div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";
import {Stats} from "@/entities/Stats";
import {ref, watchEffect} from "vue";
import {GAME_STATE, GameState} from "@/entities/GameState";
import createShareString from "@/library/createShareString";
import {Generation} from "@/entities/Generation";
import createGenerations from "@/library/createGenerations";

export default {
    name: "ModalStats",
    components: {Modal},
    props: {
        stats: Object as () => Stats,
        gameState: Object as () => GameState,
        puzzleNumber: Number,
        words: Object as () => Array<String>,
        word: String,
        generations: Object as () => Array<Generation>,
        caught: Object as () => Array<String>
    },
    setup(props: any) {
        const getTotal = (): number => {
            return props.stats?.guesses.reduce((a: number, b: number) => a + b, 0);
        }

        const percentage = (number1: number, number2: number): number => {
            if (number2 === 0) return 0;
            return Math.floor(number1 / number2 * 100);
        }

        const total = ref<number>(getTotal());
        const won = ref<Boolean>(props.gameState?.state === GAME_STATE.WON);
        const lost = ref<Boolean>(props.gameState?.state === GAME_STATE.LOST);
        const shareText = ref<String>('');
        const shareButtonText = ref<String>('Share');
        const splitGenerations = createGenerations(props.words, props.generations);
        const pokemonNumber = 1;

        const generateShareText = (): String => {
            return createShareString(
                props.gameState as GameState,
                props.puzzleNumber,
                props.caught?.length,
                props.words?.length
            );
        }

        const copyShareText = () => {
            if (navigator.share) {
                navigator.share({text: shareText.value as string});
            } else {
                navigator.clipboard.writeText(shareText.value as string).then(() => {
                    shareButtonText.value = 'Copied';
                    setTimeout(() => {
                        shareButtonText.value = 'Share';
                    }, 2000);
                });
            }
        }

        const isCaught = (word: String): Boolean => {
            return props.caught.indexOf(word) !== -1;
        }

        const getWord = (word: String): String => {
            return isCaught(word) ? word : word.replace(/[^]/g, "*");
        }

        watchEffect(() => {
            total.value = getTotal();
            shareText.value = generateShareText();
            won.value = props.gameState?.state === GAME_STATE.WON;
            lost.value = props.gameState?.state === GAME_STATE.LOST;
        });

        return {
            percentage,
            total,
            won,
            lost,
            shareButtonText,
            copyShareText,
            splitGenerations,
            isCaught,
            getWord,
            pokemonNumber
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

h2 {
    text-align: center;
}

.status-box {
    margin-bottom: 16px;
    color: $white;
    padding: 16px;
    display: flex;
    border: 3px solid $black;

    h2 {
        text-align: left;
    }

    &-text {
        flex: 1;
    }

    &.won {
        background: $green;
    }

    &.lost {
        background: $red;
    }
}

.pokemon {
    text-transform: capitalize;
    font-weight: 800;
}

.spread {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
    width: 200px;
    text-align: center;

    &-button {
        border: 0;
        border-radius: 3px;
        color: $black;
        background: $yellow;
        padding: 10px 40px;
        width: 200px;
        font-size: 26px;
        font-weight: 800;
    }
}

.stats {
    display: flex;
}

.stat {
    flex: 1;
    margin: 0 8px 16px;
    border: 3px solid $black;
    text-align: center;
    font-weight: 800;

    &-number {
        font-size: 26px;
    }

    &-text {
        text-transform: uppercase;
        font-size: 12px;
    }
}

.distribution {
    margin-bottom: 26px;

    &-row {
        display: flex;
        margin-bottom: 16px;
        line-height: 34px;
        font-weight: 800;
    }

    &-guesses {
        flex: 0 0 20px;
    }

    &-percentage-container {
        flex: 1;
        position: relative;
        height: 40px;
        border: 3px solid $black;
    }

    &-percentage {
        position: absolute;
        height: 34px;
        background: $green;
        color: $white;
        text-align: right;

        &-text {
            padding: 0 10px;
        }
    }
}

.pokedex {
    text-transform: capitalize;

    &-generation {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 32px;

        &-title {
            flex: 0 0 100%;
            width: 100%;
            font-weight: 800;
            margin-bottom: 16px;
        }
    }

    &-item {
        flex: 0 0 50%;
        width: 50%;
        display: flex;
        opacity: 0.2;

        &.caught {
            opacity: 1;
        }

        &-number {
            width: 40px;
            font-weight: 800;
        }
    }
}
</style>