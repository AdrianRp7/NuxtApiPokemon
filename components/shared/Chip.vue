<template>
    <span class="chip-container py-2 px-4" :style="{ 'background-color': bgcolor }">
        <slot />
    </span>
</template>

<script setup lang="ts">
    interface Props {
        bgcolor: string;
    }

    const { bgcolor } = defineProps<Props>();
</script>

<style scoped lang="scss">
    .chip-container {
        border-radius: $border-radius-base;
    }
</style>
