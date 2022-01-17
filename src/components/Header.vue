<template>
    <header class="header">
        <div class="header-buttons">
            <button class="header-button header-button-info" v-on:click="$emit('show-info')"><Info/></button>
        </div>
        <div class="header-title">
            <h1>Squirdle</h1>
            <p>How Well do you know your Pokémon?</p>
        </div>
        <div class="header-buttons">
            <button class="header-button header-button-medal" v-on:click="$emit('show-stats')"><Medal/></button>
            <button class="header-button header-button-settings" v-on:click="$emit('show-settings')"><Settings/></button>
        </div>
    </header>
</template>

<script>
import Info from "@/components/icons/Info";
import Medal from "@/components/icons/Medal";
import Settings from "@/components/icons/Settings";
export default {
    name: "Header",
    components: {Settings, Medal, Info},
    emits: ['show-info', 'show-stats', 'show-settings']
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.header {
    text-transform: uppercase;
    height: 48px;
    border-bottom: 1px solid $light-grey;
    margin-bottom: 40px;
    position: relative;
    display: flex;
    justify-content: space-between;
    h1 {
        font-weight: 800;
        line-height: 48px;
    }
    p {
        font-size: 14px;
    }

    &-title {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 48px;
        top: 0;
        margin: 0;
    }

    &-button {
        border: 0;
        background: 0;
        padding: 12px 6px 6px;

        svg {
            height: 24px;
            width: 24px;
            transition: transform 200ms $easing;
            path {
                fill: $black;
                transition: fill 200ms $easing;
            }
        }

        &:hover, &:focus {
            svg {
                transform: scale(1.2) rotate(5deg);
            }
        }
        &-info {
            &:hover, &:focus {
                svg path {
                    fill: $green;
                }
            }
        }
        &-medal {
            &:hover, &:focus {
                svg path {
                    fill: $pink;
                }
            }
        }
        &-settings {
            &:hover, &:focus {
                svg path {
                    fill: $blue;
                }
            }
        }
        &-cross {
            &:hover, &:focus {
                svg path {
                    fill: $red;
                }
            }
        }
    }
}
</style>