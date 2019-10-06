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

            const featureLayer = new FeatureLayer({
                url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/karaoke/FeatureServer/0",
                title: "Karaoke",
             
            });
            
            map.add(featureLayer)
            state.view = view
            state.map = map
            state.featureLayer = featureLayer
        

        })
    }
}

const actions = {
    commitInitMap:({commit}) => {
        commit("initMap")
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}