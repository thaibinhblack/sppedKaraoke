import { loadModules } from 'esri-loader'
import { addFeatures } from '@esri/arcgis-rest-feature-layer';


const state = {
    map: null,
    view: null,
    featureLayer: null,
}

const getters = {
    getView: (state) => {
        return state.view
    }
}

const mutations = {
    addFeature: (state,payload) => {
        addFeatures({
            url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/karaoke/FeatureServer/0",
            features: [{
              geometry: payload.geometry,
              attributes: payload.attributes
            }]
          })
        .then(() => {
            state.featureLayer.refresh()
        })  
    },
    initMap: (state) => 
    {
        state.loading = true
        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/widgets/Track",
        ],{
            url: "https://js.arcgis.com/4.11/",
          
        }).then(([Map,MapView,FeatureLayer,Track]) => {

            const Basemap = new Map({
                basemap: "osm",
            })

            const view = new MapView({
                container: "MapView",
                map: Basemap,
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
            var track = new Track({
                view: view
                });
            view.ui.add(track, "top-left");
            Basemap.add(featureLayer)
            state.view = view
            state.map = Basemap
            state.featureLayer = featureLayer
            state.loading = false

        })
    }
}

const actions = {
    commitInitMap:({commit}) => {
        commit("initMap")
    },
    commitaddFeature:({commit},payload) => {
        commit("addFeature",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}