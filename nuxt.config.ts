// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: [
        '@sidebase/nuxt-auth',
        '@nuxt/devtools',
        '@vueuse/nuxt',
    ],
    plugins: [
    ],
    css: [
        '@/assets/css/main.scss',
        '@/assets/css/forms.scss',
    ],
    app: {
        head: {
            meta: [
                // <meta name="viewport" content="width=device-width, initial-scale=1">
            ],
            script: [
                // <script src="https://myawesome-lib.js"></script>
            ],
            link: [
                // <link rel="stylesheet" href="https://myawesome-lib.css">
            ],
            style: [
                // <style type="text/css">:root { color: red }</style>
            ],
            noscript: [
                // <noscript>JavaScript is required</noscript>
            ]
        }
    },
    auth: {
        // The module is enabled. Change this to disable the module
        isEnabled: true,

        // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
        origin: 'http://localhost:3000',

        // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
        basePath: '/api/auth',

        // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
        enableSessionRefreshPeriodically: false,

        // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
        enableSessionRefreshOnWindowFocus: true,

        // Whether to add a global authentication middleware that will protect all pages without exclusion
        enableGlobalAppMiddleware: false,

        // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page
        defaultProvider: undefined,

        // Configuration of the global auth-middleware (only applies if you set `enableGlobalAppMiddleware: true` above!)
        globalMiddlewareOptions: {

            // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
            allow404WithoutAuth: true
        }
    },
    vue: {
        //@ts-ignore
        config: {
            productionTip: false,
            devtools: true
        }
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
        }
    },
    types: [
        // TypeScript definition files to be included in the project
        // https://nuxtjs.org/docs/configuration-glossary/configuration-typescript
        "@nuxt/types",
        "@nuxtjs/auth"
    ]
})



