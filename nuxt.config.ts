// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        api_url_pokemon: '',
        public: {
            front_url: process.env.NUXT_FRONT_URL
        }
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/test-utils',
        '@nuxtjs/google-fonts',
        '@pinia/nuxt'
    ],
    css: ['@/assets/scss/styles.scss'],
    routeRules: {
        '/': { redirect: '/pokemon/page/1' }
    },
    googleFonts: {
        families: {
            Bangers: [700, 900],
            Poppins: [400, 700]
        }
    },
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
