<template>
    <div class="keyboard">
        <div class="keyboard-row" v-for="(row, index) in keyboard" :key="index">
            <Key
                v-for="(keyboardKey, keyIndex) in row.keys"
                :keyboard-key="keyboardKey"
                :key="keyIndex"
                v-on:click="onCharacterClick(keyboardKey.character, $event)"
            />
        </div>
        <div class="keyboard-row">
            <button class="key key-delete" v-on:click="onDelete($event)">delete</button>
            <button class="key key-spacebar" v-on:click="onCharacterClick(' ', $event)">Space</button>
            <button class="key key-enter" v-on:click="onSubmit($event)">Enter</button>
        </div>
    </div>
</template>

<script lang="ts">
import Key from "@/components/Key.vue";

export default {
    name: "Keyboard",
    components: {Key},
    props: {
        keyboard: Array
    },
    setup(props: any, {emit}: any) {
        const onCharacterClick = (character: string, e: Event) => {
            e.preventDefault();
            emit('characterClick', character);
        }

        const onDelete = (e: Event) => {
            e.preventDefault();
            emit('delete');
        }

        const onSubmit = (e: Event) => {
            e.preventDefault();
            emit('submit');
        }

        return {
            onCharacterClick,
            onDelete,
            onSubmit
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.keyboard {
    height: 272px;
}

.keyboard-row {
    margin: 0 -2px 8px;
    display: flex;
}

.keyboard-row:nth-child(2) {
    padding: 0 20px;
}

.key {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin: 0 2px;
    border: 2px solid $black;
    background: $white;
    color: $dark-grey;
    cursor: pointer;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 800;
    transition: opacity 400ms $easing, background 400ms $easing;

    &:active {
        transform: scale(0.98);
    }

    &-enter, &-delete {
        width: 80px;
        flex: 0 0 80px;
    }

    &-used {
        background: $green;
    }

    &.present {
        background: $green;
    }

    &.absent {
        opacity: 0.3;
    }
}
</style>