<template>
    <button class="key" :class="{present: present, absent: absent}">
        {{ keyboardKey.character }}
    </button>
</template>

<script lang="ts">
import {Key, KEY_STATE} from "@/entities/Key";
import {ref, watchEffect} from "vue";

export default {
    name: "Key",
    props: {
        keyboardKey: Object as () => Key
    },
    setup(props: any) {
        const present = ref<Boolean>(false);
        const absent = ref<Boolean>(false);

        watchEffect( () => {
            present.value = props.keyboardKey?.state === KEY_STATE.PRESENT;
            absent.value = props.keyboardKey?.state === KEY_STATE.ABSENT;
        } );

        return {
            present,
            absent
        }
    }
}
</script>