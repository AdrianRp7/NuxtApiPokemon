<template>
    <div class="flex gap-2">
        <NuxtLink
            v-if="actualPage > 1"
            :to="{ name: nameNuxtUrl, params: { page: actualPage - 1 } }"
        >
            '&lt;'
        </NuxtLink>
        <!-- <input /> -->
        <NuxtLink
            v-if="actualPage < totalPages"
            :to="{ name: nameNuxtUrl, params: { page: actualPage + 1 } }"
        >
            '&gt;'
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
