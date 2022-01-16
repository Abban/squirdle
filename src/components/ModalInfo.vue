<template>
    <Modal :heading="'How to do a Squirdle'">
        <p>This is a take on <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> but all the words are Pokémon names.</p>
        <p>You have {{ guesses }} tries to find the Pokémon.</p>
        <p>Each guess needs to be the length of the name.</p>
        <p>Once you enter a guess you will be shown how close you were to the actual word.</p>
        <hr>
        <h2>Examples</h2>
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
            The word will change every day.
        </p>

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
.example-guess {
    display: flex;
}
</style>