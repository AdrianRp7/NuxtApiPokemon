// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        api_url_pokemon: ''
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils'],
    css: ['@/assets/scss/styles.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/injects.scss" as *;'
                }
            }
        }
    }
});
