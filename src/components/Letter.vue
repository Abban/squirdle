<template>
    <div class="letter" :class="{filled: filled, correct: correct, present: present, absent: absent}" :style="{'--index': index}">
        <div class="letter-background"></div>
        <div class="letter-inner">
            {{character}}
        </div>
    </div>
</template>

<script lang="ts">
import {LETTER_STATE} from "@/entities/Guess";
import {ref, watchEffect} from "vue";

export default {
    name: "Letter",
    props: {
        index: Number,
        state: String,
        word: String,
        character: String
    },
    setup(props: any) {
        const filled = ref<Boolean>(false);
        const correct = ref<Boolean>(false);
        const present = ref<Boolean>(false);
        const absent = ref<Boolean>(false);

        watchEffect( () => {
            filled.value = props.state === LETTER_STATE.FILLED;
            correct.value = props.state === LETTER_STATE.CORRECT;
            present.value = props.state === LETTER_STATE.PRESENT;
            absent.value = props.state === LETTER_STATE.ABSENT;
        })

        return {
            filled,
            correct,
            present,
            absent
        }
    }
}
</script>