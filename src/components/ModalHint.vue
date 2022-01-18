<template>
    <Modal :heading="'Hints'">
        <div class="hints">
            <ol v-if="pokemon || generation">
                <li v-if="generation">
                    This Pokemon is in {{ generation }}
                </li>
                <li v-if="pokemon">
                    This Pokemon has the following types:
                    <ul>
                        <li v-for="(type, index) in pokemon.types" :key="index">
                            {{ type.type.name }}
                        </li>
                    </ul>
                </li>
            </ol>
            <div v-if="!pokemon && !generation">
                Uh oh, something went wrong. Sucks to be you.
            </div>
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
        const number = ref<Number>(props.pokemon?.game_indices[0].game_index);
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