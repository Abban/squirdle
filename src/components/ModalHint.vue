<template>
    <Modal :heading="'Hints'">
        <div class="hints">
            <div v-if="pokemon || generation">
                <ol>
                    <li v-if="generation">
                        This Pokémon is in {{ generation }}
                    </li>
                    <li v-if="pokemon">
                        This Pokémon has the following types:
                        <ul>
                            <li v-for="(type, index) in pokemon.types" :key="index">
                                {{ type.type.name }}
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div v-if="!pokemon && !generation">
                Uh oh, something went wrong. Sucks to be you.
            </div>
            <p>
                If you need more help you can find a list of Pokémon <a href="https://pokemon.fandom.com/wiki/List_of_Pok%C3%A9mon" target="_blank">here</a>.
            </p>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";
import {Pokemon} from "pokenode-ts";
import {Generation} from "@/entities/Generation";
import {ref} from "vue";

export default {
    name: "ModalHint",
    components: {Modal},
    props: {
        generations: Object as () => Array<Generation>,
        pokemon: Object as () => Pokemon
    },
    setup(props: any) {
        const number = ref<Number>(props.pokemon?.id);
        const generation = props.generations?.find(
            (generation: Generation) => generation.start < number.value && generation.end >= number.value
        );

        return {
            generation: generation.name
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.hints {
    &-button {
        border: 0;
        background: none;
        color: $pink;
        line-height: 30px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 800;
        text-decoration: underline;

        &:hover, &:focus {
            color: $pink-hover;
        }
    }
}
</style>