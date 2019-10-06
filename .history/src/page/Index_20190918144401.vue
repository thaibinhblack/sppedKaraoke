<template>
    <div id="index">
       <header-tool-bar />
        <header-search />
        <content-event v-for="(karaoke,index) in karaokes" :key="index" :karaoke="karaoke"/>
    </div>
</template>

<script>
export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'content-event': () => import('@/components/contents/index/ContentEvent.vue')
    },
    data()
    {
        return {
            provinces: [
                {id: 1, name: 'HỒ CHÍ MINH'}
            ],
            karaokes: []
        }
    },
    methods: {
        ApiGetBarKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?page=1').then((response) => {
                this.karaokes = response.data
            })
        }
    },
    created()
    {
        this.ApiGetBarKaraoke()
    }
}
</script>

<style>
a {text-decoration: none;color: #333 !important;}
.container.custom {padding: 10px 15px;}
.bg-event-karaoke {width: 100%;height: 183px;background-size: cover;background-position: 50%;}
.content-top.title p{font-size: 15px;text-align: justify;line-height: 17px;margin-top: 15px;}
.content-main {text-align: justify}
.content-main:hover p {color: #f65e39;font-size: 16px}
</style>

