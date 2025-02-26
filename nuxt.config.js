import fa from 'vuetify/es5/locale/fa'

export default {
    //Routes
    router: {
        base: '/',
        middleware: 'router',
        extendRoutes(routes, resolve) {
            //Shop
            routes.push({
                name: 'ShopDetail',
                path: '/:shop',
                components: {
                    default: resolve(__dirname, 'pages/shop/detail')
                }
            })
            //Cart
            routes.push({
                name: 'CartStep1',
                path: '/:shop/cart/step-1',
                components: {
                    default: resolve(__dirname, 'pages/cart/cart-step1')
                }
            })
            routes.push({
                name: 'CartStep2',
                path: '/:shop/cart/step-2',
                components: {
                    default: resolve(__dirname, 'pages/cart/cart-step2')
                }
            })
            routes.push({
                name: 'CartStep3',
                path: '/:shop/cart/step-3',
                components: {
                    default: resolve(__dirname, 'pages/cart/cart-step3')
                }
            })
            //Order
            routes.push({
                name: 'MyOrders',
                path: '/:shop/my-orders',
                components: {
                    default: resolve(__dirname, 'pages/order/my-orders')
                }
            })
            //Account
            routes.push({
                name: 'MyProfile',
                path: '/:shop/my-profile',
                components: {
                    default: resolve(__dirname, 'pages/account/my-profile')
                }
            })
            routes.push({
                name: 'MyAddress',
                path: '/:shop/my-address',
                components: {
                    default: resolve(__dirname, 'pages/account/my-address')
                }
            })
        },
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - دخل',
        title: 'دخل',
        htmlAttrs: {
            lang: 'fa'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'theme-color', content: '#BE00B0' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: 'favicon.png' },
            /*styles*/
            { rel: 'stylesheet', href: 'styles/style.css' },
            /*material icons*/
            { rel: 'preload', href: 'fonts/materialicons/mdi.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
            {
                rel: 'preload',
                href: 'fonts/materialicons/mdi_outlined.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: ''
            },
            /*vazir fonts*/
            { rel: 'preload', href: 'fonts/vazir/400.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
            { rel: 'preload', href: 'fonts/vazir/500.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
            { rel: 'preload', href: 'fonts/vazir/700.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
            /*images*/
            { rel: 'preload', href: 'img/dakhl_logo.png', as: 'image', crossorigin: '' },
            /*fonts*/
            { rel: 'stylesheet', href: 'fonts/vazir/vazir.css' },
            { rel: 'stylesheet', href: 'fonts/materialicons/mdi.css' },
        ]
    },

    //public config
    publicRuntimeConfig: {
        baseUrl: '/',
        optLength: 4,
    },

    // Server Config
    server: {
        host: '0.0.0.0',
        port: 8080,
    },

    //env variables
    env: {},

    //to make cookie-universal-nuxt work in SSR
    ssr: true,
    target: 'server',

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'swiper/swiper-bundle.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/viranik.js',
        '~/plugins/coders.js',
        '~/plugins/order.js',
        '~/plugins/shop.js',
        '~/plugins/user.js',
        '~/plugins/api.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        'nuxt-moment-jalaali'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: 'https://api.dakhl.co/api/v1/',
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        rtl: true,
        lang: {
            locales: { fa },
            current: 'fa',
        },
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#BE00B0',
                    secondary: '#EFAB43',
                    brown: '#74625F',
                    black: '#000000',
                    gray: '#535252',
                    lightGray: '#959494',
                    background: '#F6F5F6',
                    divider: '#e3e2e3',
                    avatar: '#d6d6d6',
                    overlay: '#535252'
                },
            }
        },
        icons: {
            iconfont: 'md'
        },
        defaultAssets: false
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    //configuration loader
    loading: '~/components/part/general/Loading.vue'
}
