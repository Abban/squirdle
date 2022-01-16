<template>
    <div class="stage">
        <Guess class="stage-row" v-for="(guess, index) in guesses" :key="index" :guess="guess" :columns="columns"/>
    </div>
</template>

<script lang="ts">
import Guess from "@/components/Guess.vue";

export default {
    name: "Stage",
    components: {Guess},
    props: {
        guesses: Array,
        rows: Number,
        columns: Number
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.stage-row {
    margin: 0 -2px 8px;
    display: flex;
    justify-content: center;
}

.letter {
    flex: 1;
    display: flex;
    border: 5px solid $light-grey;
    margin: 0 2px;
    border-radius: 50%;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 20px;
    position: relative;
    max-width: 50px;

    transition: opacity 400ms $easing;
    transition-delay: calc(0.2s * var(--index));

    &:before {
        content: '';
        float: left;
        padding-top: 100%;
    }
    &.filled,
    &.correct,
    &.present,
    &.absent {
        border-color: $black;
    }

    &.filled {
        animation: letterFill 400ms ease-in-out;
    }

    &-background {
        position: absolute;
        z-index: 9;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: transparent;
        border: 0;
        transform: scale(0);
        transition: transform 400ms $easing, border 400ms $easing;
        transition-delay: calc(0.2s * var(--index));
    }

    &-inner {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        flex: 0 0 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $black;
        transition: color 400ms $easing;
        transition-delay: calc(0.2s * var(--index));
    }

    &.correct {
        .letter-background {
            background: $green;
            border: 1px solid $green;
            transform: scale(1);
        }
    }

    &.present {
        .letter-background {
            background: $yellow;
            border: 1px solid $yellow;
            transform: scale(1);
        }
    }

    &.absent {
        opacity: 0.2;
        .letter-background {
            background: $dark-grey;
            border: 1px solid $dark-grey;
            transform: scale(1);
        }
        .letter-inner {
            color: $white;
        }
    }
}

@keyframes letterFill {
    0% {
        z-index: 100;
        transform: scale(1);
    }

    70%,
    90% {
        transform: scale(1.2);
    }

    100% {
        z-index: 10;
        transform: scale(1);
    }
}
</style>