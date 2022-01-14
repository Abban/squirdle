<template>
    <Header/>
    {{ word }}
    <Stage :columns="columns" :guesses="gameState.guesses"/>
    <Keyboard
        :keyboard="gameState.keyboard"
        v-on:character-click="onCharacterClick"
        v-on:delete="onDelete"
        v-on:submit="onSubmit"
    />
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import getWord from "@/library/DailyWordResource";
import Header from "@/components/Header.vue";
import Keyboard from "@/components/Keyboard.vue";
import Stage from "@/components/Stage.vue";
import settings from "@/data/settings.json";
import keyboard from "@/data/keyboardLayout.json";
import {LETTER_STATE} from "@/entities/Guess";
import {GameState, GAME_STATE} from "@/entities/GameState";
import gameStateResource from "@/library/gameStateResource";
import validateGuess from "@/library/validateGuess";
import getUniqueDateIdentifier from "@/library/getUniqueDateIdentifier";
import updateKeyboard from "@/library/updateKeyboard";
import {KeyboardRow} from "@/entities/Key";

export default defineComponent({
    name: 'App',
    components: {
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
        const word = getWord(date, settings.seed);
        const gameState = reactive<GameState>(gameStateResource.getGameState(date, settings.guesses, word.length, keyboard));
        const currentGuessText = ref<string>('');

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
            currentGuess().valid = true;

            // Check if entered word is correct length, if not, do nothing
            if (currentGuess().word.length < word.length) return;

            // If on expert trainer validate the word is in the list
            // gameState.currentGuess.valid = false;


            validateGuess(currentGuess(), word);
            currentGuess().submitted = true;

            if (currentGuess().correct) {
                console.log('WIN');
                gameState.state = GAME_STATE.WON;
            } else if(gameState.guessIndex >= gameState.guesses.length - 1) {
                console.log('LOSE');
                gameState.state = GAME_STATE.LOST;
            }

            updateKeyboard(gameState.keyboard as Array<KeyboardRow>, currentGuess().word as string, word);
            gameState.guessIndex++;
            gameStateResource.storeGameState(gameState as GameState);
        }

        return {
            word,
            columns: word.length,
            gameState,
            currentGuessText,
            onCharacterClick,
            onDelete,
            onSubmit
        }
    }
});
</script>
