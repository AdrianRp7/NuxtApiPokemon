<template>
    <NuxtLayout name="default">
        <div class="flex flex-col h-100 w-100 justify-content-center align-center">
            <h1 class="is-text-h1 title is-color-main">{{ error.statusCode }}</h1>
            <p>{{ error.statusMessage }}</p>
            <NuxtLink class="button-default text-decoration-none p-4" to="/">
                Volver al inicio
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    interface Props {
        error: {
            statusCode: number;
            statusMessage: string;
        };
    }
    const { error } = defineProps<Props>();
</script>
