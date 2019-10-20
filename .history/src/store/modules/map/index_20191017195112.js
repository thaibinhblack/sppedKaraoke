import { loadModules } from 'esri-loader'
import { addFeatures } from '@esri/arcgis-rest-feature-layer';
import Vue from 'vue'

const state = {
    map: null,
    view: null,
    featureLayer: null,
    provinceLayer: null
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
        .then((response) => {
            state.featureLayer.refresh()
            console.log(Vue.$session.get('token'))
        })  
    },
    addProvinceFeature: (state,payload) =>
    {
        addFeatures({
            url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/province/FeatureServer/0",
            features: [{
              geometry: payload.geometry,
              attributes: payload.attributes
            }]
          })
        .then(() => {
            state.provinceLayer.refresh()
        })  
    },
    drawPoint: (state,payload) => {
        loadModules([
            "esri/Graphic"
        ],{
            url: "https://js.arcgis.com/4.11/",
          
        }).then(([Graphic]) => {
            var graphic = new Graphic({
                geometry: payload,
                symbol: {
                    type: "picture-marker",
                    url: "https://developers.arcgis.com/labs/images/bluepin.png",
                    width: "14px",
                    height: "26px"
                }
            });
            state.view.graphics.removeAll()
            state.view.graphics.add(graphic)
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
            var trailheadsRenderer = {
            type: "simple",
            symbol: {
                    type: "picture-marker",
                    url: "https://cdn0.iconfinder.com/data/icons/party-celebration-1/32/party-50-512.png",
                    width: "18px",
                    height: "18px"
                }
            }
            const featureLayer = new FeatureLayer({
                url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/karaoke/FeatureServer/0",
                title: "Karaoke",
                renderer: trailheadsRenderer,
                outFields: ["*"],
                popupTemplate: {
                    title: "Thông tin chi nhánh karaoke {NAME_BAR_KARAOKE}",
                    content:  [
                        {
                            type: "fields",
                            fieldInfos: [
                                {
                                fieldName: "NAME_BAR_KARAOKE",
                                label: "Tên chi nhánh"
                                },
                                {
                                fieldName: "NAME_PROVINCE",
                                label: "Tỉnh / Thành phố"
                                },
                                    {
                                fieldName: "NAME_DISTRICT",
                                label: "Quận / Huyện"
                                },
                                {
                                fieldName: "ADDRESS",
                                label: "Địa chỉ"
                                },
                                {
                                fieldName: "LONG",
                                label: "Kinh độ"
                                },
                                {
                                fieldName: "LAT",
                                label: "Vĩ độ"
                                },
                            ]
                        }
                    ],
                    actions: [{
                        id: "showImg",
                        title: "Xem hình ảnh",
                        className: "esri-icon-media"
                    }, {
                        id: "update-infor-tree",
                        title: "Cập nhật thông tin cây xanh",
                        className: "esri-icon-edit"
                    }, {
                        id: "edit",
                        title: "Tới trang chỉnh sửa",
                        className: "esri-icon-home"
                    }]
                }
             
            });
            var trailheadsRendererProvince = {
                type: "simple",
                symbol: {
                        type: "picture-marker",
                        url: "https://banner2.cleanpng.com/20180607/luv/kisspng-mapquest-computer-icons-logo-google-maps-5b18bd44de3033.6727374215283479729101.jpg",
                        width: "18px",
                        height: "18px"
                    }
                }
            const provinceLayer = new FeatureLayer({
                url: 'https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/province/FeatureServer/0',
                title: "Tỉnh / Thành phố",
                renderer: trailheadsRendererProvince,
            })
            var track = new Track({
                view: view
                });
            view.ui.add(track, "top-left");
            Basemap.add(featureLayer)
            Basemap.add(provinceLayer)
            state.view = view
            state.map = Basemap
            state.featureLayer = featureLayer
            state.provinceLayer = provinceLayer
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
    },
    commitaddProvinceFeautre: ({commit},payload) => {
        commit("addProvinceFeature",payload)
    },
    commitdrawPoint: ({commit},payload) => {
        commit("drawPoint",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}