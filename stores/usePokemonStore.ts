export const usePokemonStore = defineStore('PokemonStore', () => {
    const shinyModeActive = ref<boolean>(false);

    return { shinyModeActive };
});
