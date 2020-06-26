/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;
var tractRenderer;
var centroidRenderer;

require([
    'esri/Color',
    'esri/InfoTemplate',
    'esri/layers/LabelClass',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/TextSymbol',
    'dojo/domReady!'
], function(
    Color,
    InfoTemplate,
    LabelClass,
    SimpleRenderer,
    SimpleFillSymbol,
    SimpleLineSymbol,
    SimpleMarkerSymbol,
    TextSymbol
) {
    var centroidSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 5, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,255,255]),0.5), new Color([0,0,0,1]));
    centroidRenderer = new SimpleRenderer(centroidSymbol);

    var tractSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0]),0.5), new Color([115, 178, 115,0.75]));
    tractRenderer = new SimpleRenderer(tractSymbol);

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
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Wetlands/MapServer',
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
                        'legendLabel' : false,
                        'moreinfo': 'https://www.fws.gov/wetlands/Data/Wetlands-Product-Summary.html',
                        'otherLayersToggled': ['wetlandsStatus', 'wetlandsRaster']
                    }
                },
                'Wetlands Status' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Wetlands_Status/MapServer',
                    'options': {
                        'id': 'wetlandsStatus',
                        'layers': [0],
                        'visible': true,
                        'maxScale': 285000,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'includeLegend' : true,
                        'esriLegendLabel': false
                        /*'layerDefinitions': {0: "STATUS = 'Digital' OR STATUS = 'No_Data'"}*/
                    }
                },
                'Wetlands ' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Wetlands_Raster/ImageServer',
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
                        'includeLegend' : true,
                        'otherLayersToggled': ['wetlands', 'wetlandsStatus']
                    }
                },
                'Riparian' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Riparian/MapServer',
                    'visibleLayers': [0],
                    'options': {
                        'id': 'riparian',
                        'opacity': 0.75,
                        'visible': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html',
                        'includeLegend' : true,
                        'legendLabel': false
                    }
                },
                'Riparian Mapping Areas' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Riparian/MapServer',
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
                        'includeLegend' : true,
                        'legendLabel': false
                    }
                },
                'HUC8' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/HUCs/MapServer',
                    'options': {
                        'id': 'huc8',
                        'opacity': 1.00,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'includeLegend': true,
                        'esriLegendLabel': false
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
                    'url' : 'https://fwsprimary.wim.usgs.gov/server/rest/services/Data_Source/MapServer',
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
                        //'moreinfo': "https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf",
                        'otherLayersToggled': ['imageScale', 'imageYear'],
                        'legendLabel': false
                    }
                },
                'Image Scale': {
                    'url' : 'https://fwsprimary.wim.usgs.gov/server/rest/services/Data_Source/MapServer',
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
                        'otherLayersToggled': ['sourceType', 'imageYear'],
                        'legendLabel': false
                    }
                },
                'Image Year': {
                    'url' : 'https://fwsprimary.wim.usgs.gov/server/rest/services/Data_Source/MapServer',
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
                        'otherLayersToggled': ['sourceType', 'imageScale'],
                        'legendLabel': false
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
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Areas_of_Interest/MapServer/0',
                    'options': {
                        'id': 'aoi',
                        'opacity': 1.00,
                        'visible': false,
                        'outFields': ["*"],
                        'infoTemplate': template,
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
                'FWS Managed Lands Centroids' : { //CENTROIDS
                    'url': 'https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/FWSCentroids/FeatureServer/0',
                    'options': {
                        'id': 'fwsCentroids',
                        'opacity': 0.75,
                        'maxScale': 18000000,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        'includeInLayerList': false,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/gis/data/CadastralDB/index_cadastral.html',
                        'includeLegend' : true,
                        'esriLegendLabel': false,
                        'renderer': centroidRenderer
                    }
                },
                'FWS Managed Lands' : { 
                    'url': 'https://services.arcgis.com/QVENGdaPbd4LUkLV/arcgis/rest/services/National_Wildlife_Refuge_System_Boundaries/FeatureServer/0',
                    //'url': 'https://services.arcgis.com/QVENGdaPbd4LUkLV/arcgis/rest/services/FWSApproved_Authoritative/FeatureServer/1',
                    //'url': 'https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/National_Wildlife_Refuge_System_Boundaries/FeatureServer/0',
                    'options': {
                        'id': 'fwsTracts',
                        'opacity': 0.75,
                        'minScale': 18000000,
                        'visible': false,
                        'outFields': ["*"],
                        'showLabels': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/gis/data/CadastralDB/index_cadastral.html',
                        'otherLayersToggled': ['fwsCentroids'],
                        'includeLegend' : true,
                        'esriLegendLabel': false,
                        'renderer': tractRenderer
                    }
                },/*
                'FWS Managed Lands' : { //labels turn on at 1:2,311,162
                    'url': 'https://gis.fws.gov/ArcGIS/rest/services/FWS_Refuge_Boundaries/MapServer',
                    'visibleLayers': [1],
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
                        'otherLayersToggled': ['fwsCentroids', 'fwsTracts'],
                        'includeLegend' : true,
                        'esriLegendLabel': false
                    }
                },*/
                'Historic Wetland Data' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/Historic_Wetlands/MapServer',
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
                        'moreinfo': 'https://www.fws.gov/wetlands/Data/Historic-Wetlands-Data.html',
                        'includeLegend' : true,
                        'legendLabel': false
                    }
                }
            }
        }
        
    ];

});