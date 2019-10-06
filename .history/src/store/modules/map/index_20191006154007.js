import { loadModules } from 'esri-loader'


const state = {
    map: null,
    view: null,
    featureLayer: null
}

const getters = {

}

const mutations = {
    initMap: (state) => 
    {
        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
        ],{
            url: "https://js.arcgis.com/4.11/",
          
        }).then(([Map,MapView,FeatureLayer]) => {
            const Map = new Map({
                basemap: "osm",
            })

            const view = new MapView({
                container: "MapView",
                map: map,
                center:   [106.366362, 10.360622],
                zoom: 6,
                highlightOptions: {
                    color: [255, 241, 58],
                    fillOpacity: 0.4
                }
            })
        })
    }
}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}