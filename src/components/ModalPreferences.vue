<template>
    <Modal :heading="'Settings'">
        <ul class="preferences">
            <li>
                <label class="preference">
                    <span class="preference-text">
                        <span class="preference-title">
                            Expert Trainer
                        </span>
                        <span class="preference-description">
                            When active only valid Pokémon names can be entered.
                        </span>
                    </span>
                    <span class="preference-toggle">
                        <input type="checkbox" v-model="expert">
                        <Toggle/>
                    </span>
                </label>
            </li>
            <li>
                <label class="preference">
                    <span class="preference-text">
                        <span class="preference-title">
                            Feedback
                        </span>
                        <span class="preference-description">
                            Shout at me on <a href="https://twitter.com/blunderjack">Twitter</a>
                        </span>
                    </span>
                </label>
            </li>
            <li>
                <label class="preference">
                    <span class="preference-text">
                        <span class="preference-title">
                            Info
                        </span>
                        <span class="preference-description">
                            My name is Abban, and I made this in order to see if I could make a Wordle. The source code is on my <a href="https://github.com/Abban/squirdle">GitHub</a>.<br><strong>This is puzzle number {{puzzleNumber}}.</strong>
                        </span>
                    </span>
                </label>
            </li>
        </ul>
    </Modal>
</template>

<script lang="ts">
import {Preferences} from "@/entities/Preferences";
import {ref, watch} from "vue";
import Modal from "@/components/Modal.vue";
import Toggle from "@/components/Toggle.vue";

export default {
    name: "ModalPreferences",
    components: {Toggle, Modal},
    props: {
        preferences: Object as () => Preferences,
        puzzleNumber: Number
    },
    emits: ['update:expert'],
    setup(props: any, {emit}: any) {
        const expert = ref<Boolean>(props.preferences?.expert);

        watch(expert, value => {
            emit('update:expert', value);
        })

        return {
            expert
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.preferences {
    list-style-type: none;
    text-align: left;
}

.preference {
    display: flex;
    cursor: pointer;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid $light-grey;
    &-text {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    &-toggle {
        flex: 0 0 100px;
        width: 100px;
        display: flex;
        justify-content: right;
        align-items: center;

        input {
            display: none;
        }
    }
    &-title {
        font-weight: 800;
        text-transform: uppercase;
    }
}
</style>