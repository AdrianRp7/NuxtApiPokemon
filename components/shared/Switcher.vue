<template>
    <label class="switch">
        <input v-model="model" type="checkbox" />
        <span class="slider round" />
    </label>
</template>

<script setup lang="ts">
    const model = defineModel<boolean>();
</script>

<style scoped lang="scss">
    @use 'sass:map';
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: map.get($colors, 'white');
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: map.get($colors, 'accent-pikachu');
    }

    input:focus + .slider {
        box-shadow: 0 0 1px map.get($colors, 'accent-pikachu');
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
