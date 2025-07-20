<template>
    <div class="flex align-center gap-2">
        <NuxtLink
            v-if="actualPage > 1"
            class="button-page button-default p-2"
            :to="{ name: nameNuxtUrl, params: { page: actualPage - 1 } }"
        >
            &lt;
        </NuxtLink>
        <p>{{ actualPage }}</p>
        <NuxtLink
            v-if="actualPage < totalPages"
            class="button-page button-default p-2"
            :to="{ name: nameNuxtUrl, params: { page: actualPage + 1 } }"
        >
            &gt;
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
    import { NuxtLink } from '#components';

    interface Props {
        nameNuxtUrl: string;
        totalElements: number;
        actualPage: number;
        elementsPerPage: number;
    }

    const { nameNuxtUrl, totalElements, actualPage, elementsPerPage } = defineProps<Props>();

    const totalPages = Math.ceil(totalElements / elementsPerPage);
</script>

<style scoped lang="scss">
    .button-page {
        text-decoration: none;
    }
</style>
