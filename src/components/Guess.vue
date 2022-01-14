<template>
    <div class="guess" :class="{'invalid': !guess.valid}">
        <Letter
            v-for="(item, index) in columns"
            :key="index"
            :index="index"
            :character="guess.word.substr(index, 1)"
            :state="guess.letterStates[index]"
        />
    </div>
</template>

<script lang="ts">
import {Guess} from "@/entities/Guess";
import Letter from "@/components/Letter.vue";

export default {
    name: "Guess",
    components: {Letter},
    props: {
        columns: Number,
        guess: Object as () => Guess
    }
}
</script>

<style lang="scss">
.guess.invalid {
    animation: shake 500ms ease-in-out;
}

@keyframes shake {
    from,
    to {
        transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-5px);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(5px);
    }
}
</style>