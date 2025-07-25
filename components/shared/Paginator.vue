<template>
    <div class="flex flex-col align-center gap-3">
        <div class="flex align-center gap-2">
            <NuxtLink
                class="button-page button-default p-2"
                :class="{ disabled: actualPage <= 1 }"
                :to="{ name: nameNuxtUrl, params: { page: previousPage } }"
                @click="changedPage(actualPage - 1 >= 1)"
            >
                &lt;
            </NuxtLink>
            <input
                v-model="pageInput"
                class="button-default input-number text-center"
                type="number"
                @keydown.enter="changePage(pageInput)"
            />
            <NuxtLink
                :disabled="actualPage >= totalPages"
                class="button-page button-default p-2"
                :class="{ disabled: actualPage >= totalPages }"
                :to="{ name: nameNuxtUrl, params: { page: nextPage } }"
                @click="changedPage(actualPage + 1 <= totalPages)"
            >
                &gt;
            </NuxtLink>
        </div>
        <p class="is-color-main is-text-regular text-center">
            {{ messageError }}
        </p>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        nameNuxtUrl: string;
        totalElements: number;
        actualPage: number;
        elementsPerPage: number;
    }
    const emit = defineEmits<{
        (e: 'changed-page'): void;
    }>();

    const { nameNuxtUrl, totalElements, actualPage, elementsPerPage } = defineProps<Props>();

    const totalPages = Math.ceil(totalElements / elementsPerPage);

    const router = useRouter();
    const messageError = ref<string>('');
    const pageInput = ref<number>(actualPage);
    const previousPage = computed<number>(() => {
        return actualPage <= 1 ? 1 : actualPage - 1;
    });
    const nextPage = computed<number>(() => {
        return actualPage >= totalPages ? totalPages : actualPage + 1;
    });

    const changePage = (page: number): void => {
        if (page % 1 !== 0) {
            // eslint-disable-next-line quotes
            messageError.value = "The page musn't contain decimals";
            pageInput.value = actualPage;
        } else if (totalPages >= page && page > 0) {
            emit('changed-page');
            router.push({ name: nameNuxtUrl, params: { page } });
        } else {
            messageError.value = `The page must be between 1 to ${totalPages}`;
            pageInput.value = actualPage;
        }
    };

    const changedPage = (condition: boolean) => {
        if (condition) emit('changed-page');
    };
</script>

<style scoped lang="scss">
    @use 'sass:map';
    .button-page {
        text-decoration: none;

        transition: all 0.25s ease;

        &:not(.disabled):hover {
            color: map.get($colors, 'white');
            background-color: map.get($colors, 'accent-pikachu');
        }

        &:not(.disabled):focus {
            color: map.get($colors, 'white');
            background-color: map.get($colors, 'main');
        }
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .input-number {
        height: 100%;
        width: 5rem;

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        &[type='number'] {
            -moz-appearance: textfield;
        }
    }
</style>
