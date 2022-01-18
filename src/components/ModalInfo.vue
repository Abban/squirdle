<template>
    <Modal :heading="'How to do a Squirdle'">
        <p>You have <strong>{{ guesses }}</strong> tries to find the Pokémon.</p>
        <p>The number of letters changes every day and is the <strong>length of the current Pokémon's name</strong>.</p>
        <p>This game is <strong>rock hard</strong>, so if you want you can turn off expert mode in settings then enter any characters you want.</p>
        <p>Once you enter a guess you will be shown how close you were to the actual word.</p>
        <p>There are <strong>901</strong> Pokémon, can you catch them all?</p>
        <hr>
        <h2>Example</h2>
        <Guess
            class="example-guess"
            :guess="guessExample"
            :columns="6"
        />
        <ol>
            <li><strong>"O"</strong> is in the correct position.</li>
            <li><strong>"I"</strong> is in the word somewhere but in a different position.</li>
            <li><strong>"H"</strong> is not in the word.</li>
        </ol>
        <hr>
        <p>
            There'll be a new Pokémon every day.
        </p>

        <div class="play">
            <button class="play-button" v-on:click="$emit('close')">Play Squirdle</button>
        </div>

    </Modal>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";
import Guess from "@/components/Guess.vue";
import {Guess as GuessInterface, LETTER_STATE} from "@/entities/Guess";
import {reactive} from "vue";

export default {
    name: "ModalInfo",
    components: {Guess, Modal},
    props: {
        guesses: Number
    },
    setup() {
        const guessExample = reactive<GuessInterface>({
            submitted: true,
            valid: true,
            correct: false,
            word: 'oddish',
            letterStates: [
                LETTER_STATE.CORRECT,
                LETTER_STATE.UNSET,
                LETTER_STATE.UNSET,
                LETTER_STATE.PRESENT,
                LETTER_STATE.UNSET,
                LETTER_STATE.ABSENT,
            ]
        });

        return {
            guessExample
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.example-guess {
    display: flex;
    justify-content: center;
}
.play {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 16px;

    &-button {
        border: 0;
        border-radius: 3px;
        color: $white;
        background: $green;
        padding: 10px 40px;
        width: 300px;
        font-size: 26px;
        font-weight: 800;
    }
}
</style>