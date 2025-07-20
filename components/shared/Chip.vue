<template>
    <span class="py-2 px-4" :style="{ 'background-color': bgcolor }">
        <slot />
    </span>
</template>

<script setup lang="ts">
    interface Props {
        bgcolor: string;
    }

    const { bgcolor } = defineProps<Props>();
</script>

<style scoped></style>
