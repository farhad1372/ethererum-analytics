import Vue from "vue";
import VueRouter from "vue-router";
import HomeLayout from "../components/base-layout.vue";
import Home from "../pages/home.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: HomeLayout,
        children: [
            {
                path: "",
                name: "Home",
                component: Home,
                meta: {
                    next: {
                        text: "Section 1: Total Supply & Circulating Supply",
                        link: "Section-1"
                    },
                    prev: null,
                    title: ['Introduction']
                }
            },
            {
                path: "general/concepts",
                name: "general.concepts",
                component: () => import("../pages/general/concepts.vue"),
                meta: {
                    title: ['General', 'Concepts']
                }
            },

            {
                path: "general/analytics",
                name: "general.analytics",
                component: () => import("../pages/general/analytics.vue"),
                meta: {
                    title: ['General', 'Analytics']
                }
            },


            // -------------------------- fee
            {
                path: "fee/concepts",
                name: "fee.concepts",
                component: () => import("../pages/fee/concepts.vue"),
                meta: {
                    title: ['Fee', 'Concepts']
                }
            },

            {
                path: "fee/gas-fee",
                name: "fee.gasfee",
                component: () => import("../pages/fee/gas_fee.vue"),
                meta: {
                    title: ['Fee', 'Gas Fee']
                }
            },

            {
                path: "fee/miners-block",
                name: "fee.minersblock",
                component: () => import("../pages/fee/miners_block.vue"),
                meta: {
                    title: ['Fee', 'Gas Fee']
                }
            },

            // -------------------------- stake-unstake
            {
                path: "stake-unstake/concepts",
                name: "stake-unstake.concepts",
                component: () => import("../pages/stake-unstake/concepts.vue"),
                meta: {
                    title: ['Stake And Unstake', 'Concepts']
                }
            },

            {
                path: "stake-unstake/analytics",
                name: "stake-unstake.analytics",
                component: () => import("../pages/stake-unstake/analytics.vue"),
                meta: {
                    title: ['Stake And Unstake', 'Analytics']
                }
            },

            // -------------------------- nft
            {
                path: "nft/concepts",
                name: "nft.concepts",
                component: () => import("../pages/nft/concepts.vue"),
                meta: {
                    title: ['NFT', 'Concepts']
                }
            },

            {
                path: "nft/mint",
                name: "nft.mint",
                component: () => import("../pages/nft/mint.vue"),
                meta: {
                    title: ['NFT', 'Mint']
                }
            },

            {
                path: "nft/seals",
                name: "nft.seals",
                component: () => import("../pages/nft/seals.vue"),
                meta: {
                    title: ['NFT', 'Seals']
                }
            },

            // --- analitics



            // -------------------------- bridge
            {
                path: "bridge/concepts",
                name: "bridge.concepts",
                component: () => import("../pages/bridge/concepts.vue"),
                meta: {
                    title: ['Bridge', 'Concepts']
                }
            },

            {
                path: "bridge/analytics",
                name: "bridge.analytics",
                component: () => import("../pages/bridge/analytics.vue"),
                meta: {
                    title: ['Bridge', 'Analytics']
                }
            },

            {
                path: "refrences",
                name: "refrences",
                component: () => import("../pages/refrences/index.vue"),
                meta: {
                    title: ['Refrences']
                }
            },

            {
                path: "resources",
                name: "resources",
                component: () => import("../pages/resources/index.vue"),
                meta: {
                    title: ['Resources']
                }
            },





            // {
            //     path: "general",
            //     name: "General",
            //     component: () => import("../pages/sections/general.vue")
            // },
            // {
            //     path: "section-2",
            //     name: "Section-2",
            //     component: () => import("../pages/sections/section2.vue")
            // },
            // {
            //     path: "section-3",
            //     name: "Section-3",
            //     component: () => import("../pages/sections/section3.vue")
            // },
            // {
            //     path: "section-4",
            //     name: "Section-4",
            //     component: () => import("../pages/sections/section4.vue")
            // },
            // {
            //     path: "section-5",
            //     name: "Section-5",
            //     component: () => import("../pages/sections/section5.vue")
            // },
            // {
            //     path: "section-6",
            //     name: "Section-6",
            //     component: () => import("../pages/sections/section6.vue")
            // }
        ]
    },
    {
        path: "*",
        redirect: { name: "404" }
    },
    {
        path: "/not-found/404",
        component: () => import("../pages/errors/404.vue"),
        name: "404"
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    // base: "",
    routes,
    scrollBehavior() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0, behavior: "smooth" });
            }, 100);
        });
    },
});








export default router;
