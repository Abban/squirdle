<template>
    <div class="toggle">
        <div class="switch"></div>
    </div>
</template>

<script>
export default {
    name: "Toggle"
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.toggle {
    background: $red;
    border: 2px solid $red;
    position: relative;
    height: 30px;
    width: 60px;
    border-radius: 15px;
    transition: background 200ms $easing, border 200ms $easing;
}

.switch {
    position: absolute;
    top: 0;
    left: 0;
    background: $white;
    height: 26px;
    width: 26px;
    border-radius: 13px;
    transition: left 200ms $easing;
}

input:checked + .toggle {
    background: $green;
    border-color: $green;
    .switch {
        left: 30px;
    }
}
</style>