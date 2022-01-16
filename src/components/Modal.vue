<template>
    <div class="modal">
        <div class="modal-content">
            <header class="header">
                <div class="header-buttons">
                </div>
                <h1 class="header-title">{{ heading }}</h1>
                <div class="header-buttons">
                    <button class="header-button header-button-cross" v-on:click="$emit('close')">
                        <Cross/>
                    </button>
                </div>
            </header>
            <slot/>
        </div>

    </div>
</template>

<script>
import Cross from "@/components/icons/Cross";

export default {
    name: "Modal",
    components: {Cross},
    props: {
        heading: String
    },
    emits: ['close']
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.modal {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 10px 10px;
    text-align: left;
    background: $white;
    opacity: 0;
    animation: showModal 300ms $easing;
    animation-fill-mode: forwards;

    &-content {
        transform: scale(1.2);
        max-width: 500px;
        margin: 0 auto;
        animation: showModalInner 300ms $easing;
        animation-fill-mode: forwards;
    }

    .header-title {
        @media screen and (max-width: 460px) {
            font-size: 1.5rem;
        }

        @media screen and (max-width: 360px) {
            font-size: 1.2rem;
        }
    }
}
@keyframes showModal {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
@keyframes showModalInner {
    0% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>