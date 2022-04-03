<template>
    <Header
        v-on:show-info="infoVisible = true"
        v-on:show-stats="statsVisible = true"
        v-on:show-settings="settingsVisible = true"
    />
    <div class="stage-container">
        <Stage :columns="columns" :guesses="gameState.guesses"/>
    </div>
    <button class="hints-button" v-on:click="onShowHint">Need Hint?</button>
    <Keyboard
        :keyboard="gameState.keyboard"
        v-on:character-click="onCharacterClick"
        v-on:delete="onDelete"
        v-on:submit="onSubmit"
    />
    <ModalHint
        v-if="hintVisible"
        :pokemon="hintPokemon"
        :generations="generations"
        v-on:close="hintVisible = false"
    />
    <ModalInfo
        v-if="infoVisible"
        :guesses="rows"
        v-on:close="infoVisible = false"
    />
    <ModalStats
        v-if="statsVisible"
        :word="word"
        :stats="stats"
        :gameState="gameState"
        :puzzle-number="puzzleNumber"
        :words="words"
        :generations="generations"
        :caught="caught"
        v-on:close="statsVisible = false"
    />
    <ModalPreferences
        v-if="settingsVisible"
        :preferences="preferences"
        :puzzle-number="puzzleNumber"
        v-on:close="settingsVisible = false"
        v-on:update:expert="onUpdateExpertPreference"
    />
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import wordResource from "@/library/wordResource";
import Header from "@/components/Header.vue";
import Keyboard from "@/components/Keyboard.vue";
import Stage from "@/components/Stage.vue";
import settings from "@/data/settings.json";
import keyboard from "@/data/keyboardLayout.json";
import defaultPreferences from "@/data/defaultPreferences.json";
import daysToReset from "@/data/daysToReset.json";
import {LETTER_STATE} from "@/entities/Guess";
import {GameState, GAME_STATE} from "@/entities/GameState";
import gameStateResource from "@/library/gameStateResource";
import validateGuess from "@/library/validateGuess";
import getUniqueDateIdentifier from "@/library/getUniqueDateIdentifier";
import updateKeyboard from "@/library/updateKeyboard";
import {KeyboardRow} from "@/entities/Key";
import {Preferences} from "@/entities/Preferences";
import preferencesResource from "@/library/preferencesResource";
import ModalPreferences from "@/components/ModalPreferences.vue";
import getPuzzleNumber from "@/library/puzzleNumber";
import ModalInfo from "@/components/ModalInfo.vue";
import ModalStats from "@/components/ModalStats.vue";
import {Stats} from "@/entities/Stats";
import statsResource from "@/library/statsResource";
import caughtResource from "@/library/caughtResource";
import playedResource from "@/library/playedResource";
import resetsResource from "@/library/resetsResource";
import ModalHint from "@/components/ModalHint.vue";
import {Pokemon} from "pokenode-ts";
import hintsResource from "@/library/hintsResource";
import Resetter from "@/library/Resetter";

export default defineComponent({
    name: 'App',
    components: {
        ModalHint,
        ModalStats,
        ModalInfo,
        ModalPreferences,
        Stage,
        Keyboard,
        Header,
    },
    data: () => {
        return {
            settings
        }
    },
    setup() {
        const date = getUniqueDateIdentifier();
        const words = wordResource.getWords();
        const generations = wordResource.getGenerations();
        const word = wordResource.getWord(date, settings.seed);
        const puzzleNumber = getPuzzleNumber();
        const infoVisible = ref<Boolean>(false);
        const statsVisible = ref<Boolean>(false);
        const settingsVisible = ref<Boolean>(false);
        const hintVisible = ref<Boolean>(false);
        const resetter = new Resetter(daysToReset.days, resetsResource, statsResource.getStats(settings.guesses));
        const gameState = reactive<GameState>(gameStateResource.getGameState(date, settings.guesses, word.length, keyboard, resetter));
        const preferences = reactive<Preferences>(preferencesResource.getPreferences(defaultPreferences));
        const stats = reactive<Stats>(statsResource.getStats(settings.guesses));
        const caught = reactive<Array<String>>(caughtResource.getCaught());
        const currentGuessText = ref<string>('');
        const hintPokemon = ref<Pokemon|null>(null);

        if (!playedResource.hasPlayed()) {
            infoVisible.value = true;
            playedResource.setPlayed();
        }

        const currentGuess = () => {
            return gameState.guesses[gameState.guessIndex];
        }

        const onCharacterClick = (character: string) => {
            if (gameState.state !== GAME_STATE.IN_PROGRESS) return;

            if (currentGuess().word.length < word.length) {
                const letterIndex = currentGuess().word.length;
                currentGuess().letterStates[letterIndex] = LETTER_STATE.FILLED;
                currentGuess().word += character;
            }
        }

        const onDelete = () => {
            if (gameState.state !== GAME_STATE.IN_PROGRESS) return;

            const letterIndex = currentGuess().word.length - 1;
            currentGuess().word = currentGuess().word.slice(
                0,
                letterIndex
            );
            currentGuess().letterStates[letterIndex] = LETTER_STATE.UNSET;
        }

        const onSubmit = () => {
            if (gameState.state !== GAME_STATE.IN_PROGRESS) return;

            // Check if entered word is correct length, if not, do nothing
            if (currentGuess().word.length < word.length) return;

            if (preferences.expert && !wordResource.wordExists(currentGuess().word as string)) {
                currentGuess().valid = false;
                setTimeout(() => {
                    currentGuess().valid = true;
                }, 2000);
                return;
            }

            validateGuess(currentGuess(), word);
            currentGuess().submitted = true;

            if (currentGuess().correct) {
                gameState.state = GAME_STATE.WON;
                stats.played++;
                stats.won++;
                stats.guesses[gameState.guessIndex]++;
                caughtResource.addCaught(caught as Array<String>, currentGuess().word as String);
                setTimeout(() => {
                    statsVisible.value = true;
                }, 3000);
            } else if (gameState.guessIndex >= gameState.guesses.length - 1) {
                gameState.state = GAME_STATE.LOST;
                stats.played++;
                setTimeout(() => {
                    statsVisible.value = true;
                }, 3000);
            }

            updateKeyboard(gameState.keyboard as Array<KeyboardRow>, currentGuess().word as string, word);
            gameState.guessIndex++;

            gameStateResource.storeGameState(gameState as GameState);
            statsResource.storeStats(stats as Stats);
        }

        const onUpdateExpertPreference = (expert: Boolean) => {
            preferences.expert = expert;
            preferencesResource.storePreferences(preferences);
        }

        const onShowHint = (e: Event) => {
            e.preventDefault();

            if (!hintPokemon.value) {
                const id = words.indexOf(word);
                if(id === -1) {
                    hintVisible.value = true;
                } else {
                    hintsResource.getPokemonInfo(id + 1).then(data => {
                        hintPokemon.value = data;
                        hintVisible.value = true;
                    });
                }
            } else {
                hintVisible.value = true;
            }
        }

        return {
            words,
            generations,
            caught,
            word,
            rows: settings.guesses,
            columns: word.length,
            gameState,
            preferences,
            stats,
            currentGuessText,
            infoVisible,
            statsVisible,
            settingsVisible,
            hintVisible,
            puzzleNumber,
            hintPokemon,
            onCharacterClick,
            onDelete,
            onSubmit,
            onUpdateExpertPreference,
            onShowHint,
        }
    }
});
</script>
