/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;
var renderer;

require([
    'esri/InfoTemplate',
    'esri/renderers/UniqueValueRenderer',
    'esri/symbols/PictureMarkerSymbol',
    'dojo/domReady!'
], function(
    InfoTemplate,
    UniqueValueRenderer,
    PictureMarkerSymbol
) {

    var defaultSymbol = new PictureMarkerSymbol("./images/grn-pushpin.png", 45, 45);

    renderer = new UniqueValueRenderer(defaultSymbol);

    var template = new InfoTemplate("${NAME}",
        "Type: ${TYPE}<br/>" +
        "Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>" +
        "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
        "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
        "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
    )

    allLayers = [
        {
            'groupHeading': 'ESRI dynamic map services',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'layers': {
                'Wetlands' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Wetlands/MapServer',
                    'options': {
                        'id': 'wetlands',
                        'opacity': 0.75,
                        'visible': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'includeLegend' : true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Data/Wetlands-V2-Product-Summary.html',
                        'otherLayersToggled': ['wetlandsStatus', 'wetlandsRaster']
                    }
                },
                'Wetlands Status' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Wetlands_Status/MapServer',
                    'options': {
                        'id': 'wetlandsStatus',
                        'layers': [1],
                        'visible': true,
                        'maxScale': 285000,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'includeLegend' : true,
                        'layerDefinitions': {0: "STATUS = 'Digital' OR STATUS = 'No_Data'"}
                    }
                },
                'Wetlands ' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Wetlands_Raster/ImageServer',
                    'options': {
                        'id': 'wetlandsRaster',
                        'visible': true,
                        'maxScale': 285000,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisImage',
                        'includeInLayerList': false,
                        'includeLegend' : true
                    }
                },
                'Riparian' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Riparian/MapServer',
                    'visibleLayers': [0],
                    'options': {
                        'id': 'riparian',
                        'opacity': 0.75,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html',
                        'includeLegend' : true
                    }
                },
                'Riparian Mapping Areas' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Riparian/MapServer',
                    'visibleLayers': [1],
                    'options': {
                        'id': 'riparianStatus',
                        'visible': false,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html',
                        'includeLegend' : true
                    }
                },
                'HUC8' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/HUCs/MapServer',
                    'options': {
                        'id': 'huc8',
                        'opacity': 1.00,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false
                    }
                }
            }
        },
        {
            'groupHeading': 'Data Source Group',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'moreinfo': "https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf",
            'otherLayersToggled': ['sourceType', 'imageScale', 'imageYear'],
            'layers': {
                'Source Type':{
                    'url' : 'https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Data_Source/MapServer',
                    'visibleLayers': [1],
                    'options':{
                        'id': 'sourceType',
                        'opacity': 0.6,
                        'visible': false
                    },
                    'wimOptions':{
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'exclusiveGroupName':'Data Source',
                        'includeLegend' : true,
                        'moreinfo': "https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf",
                        'otherLayersToggled': ['imageScale', 'imageYear']
                    }
                },
                'Image Scale': {
                    'url' : 'https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Data_Source/MapServer',
                    'visibleLayers': [2],
                    'options':{
                        'id': 'imageScale',
                        'opacity': 0.6,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'exclusiveGroupName':'Data Source',
                        'includeLegend' : true,
                        'otherLayersToggled': ['sourceType', 'imageYear']
                    }
                },
                'Image Year': {
                    'url' : 'https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Data_Source/MapServer',
                    'visibleLayers': [3],
                    'options':{
                        'id': 'imageYear',
                        'opacity': 0.6,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'exclusiveGroupName':'Data Source',
                        'includeLegend' : true,
                        'otherLayersToggled': ['sourceType', 'imageScale']
                    }
                }
            }
        },
        {
            'groupHeading': 'refuges and historic',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'layers': {
                'Areas of Interest' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Areas_of_Interest/MapServer/0',
                    'options': {
                        'id': 'aoi',
                        'opacity': 1.00,
                        'visible': false,
                        'outFields': ["*"],
                        'infoTemplate': template
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        'includeInLayerList': true,
                        'hasOpacitySlider': false,
                        'moreinfo': 'https://www.fws.gov/wetlands/Data/metadata/FWS_Wetland_Areas_of_Interest.xml',
                        'includeLegend' : true
                        //'renderer': renderer
                    }
                },
                'FWS Refuges' : {
                    'url': 'https://gis.fws.gov/ArcGIS/rest/services/FWS_Refuge_Boundaries/MapServer',
                    'visibleLayers': [0,1,3],
                    'options': {
                        'id': 'fwsRefuges',
                        'opacity': 0.75,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/gis/data/CadastralDB/index_cadastral.html',
                        'includeLegend' : true
                    }
                },
                'Historic Wetland Data' : {
                    'url': 'https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Historic_Wetlands/MapServer',
                    'visibleLayers': [0,1],
                    'options': {
                        'id': 'historic',
                        'visible': false,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Data/Historic-Wetlands-Product-Summary.html',
                        'includeLegend' : true
                    }
                }
            }
        }
        
    ];

});