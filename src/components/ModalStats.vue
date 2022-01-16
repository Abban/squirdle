<template>
    <Modal :heading="'Statistics'">
        <div class="status-box-won" v-if="won">
            <h2>You won!</h2>
            <p>Good job on that.</p>
        </div>
        <div class="status-box-lost" v-if="lost">
            <h2>You lost!</h2>
            <p>Bummer, try again tomorrow.</p>
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
                    {{ Math.floor(stats.won / stats.played * 100) }}%
                </div>
                <div class="stat-text">
                    % wins
                </div>
            </div>
        </div>
        <h2>Correct Answers</h2>
        <div class="distribution">
            <div class="distribution-row" v-for="(guess, index) in stats.guesses" :key="index">
                <div class="distribution-guesses">
                    {{index+1}}
                </div>
                <div class="distribution-percentage-container">
                    <div class="distribution-percentage" :style="{width: `${Math.floor(guess/total*100)}%`}">
                        <div class="distribution-percentage-text">
                            {{ Math.floor(guess/total*100) }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="share">
            <button class="share-button">Share</button>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";
import {Stats} from "@/entities/Stats";
import {ref, watchEffect} from "vue";
import {GAME_STATE} from "@/entities/GameState";

export default {
    name: "ModalStats",
    components: {Modal},
    props: {
        stats: Object as () => Stats,
        state: String
    },
    setup(props: any) {
        const getTotal = (): number => {
            return props.stats?.guesses.reduce((a: number, b: number) => a + b, 0);
        }
        const total = ref<number>(getTotal());
        const won = ref<Boolean>(props.state === GAME_STATE.WON);
        const lost = ref<Boolean>(props.state === GAME_STATE.LOST);

        watchEffect(() => {
            total.value = getTotal();
            won.value = props.state === GAME_STATE.WON;
            lost.value = props.state === GAME_STATE.LOST;
        });

        return {
            total,
            won,
            lost
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

h2 {
    text-align: center;
}

.status-box-won,
.status-box-lost {
    text-align: center;
    margin-bottom: 16px;
    color: $white;
    padding: 16px;
}

.status-box-won {
    background: $green;
}

.status-box-lost {
    background: $red;
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
.share {
    text-align: center;
    &-button {
        border: 0;
        border-radius: 3px;
        color: $black;
        background: $yellow;
        padding: 10px 40px;
        font-size: 26px;
        font-weight: 800;
    }
}
</style>