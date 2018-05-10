//for jshint
// jshint ignore: start
'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1

/**
 * Created by bdraper on 4/3/2015.
 */

var map;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var printCount = 0;
var legendLayers = [];
var measurement;

var identifyTask, identifyParams;

var aoiClicked = false;

var initWetlandClicked = false;

require([
    'esri/map',
    'esri/arcgis/utils',
    'esri/config',
    'esri/dijit/Geocoder',
    'esri/dijit/HomeButton',
    'esri/dijit/Legend',
    'esri/dijit/LocateButton',
    'esri/dijit/Measurement',
    'esri/dijit/PopupTemplate',
    'esri/graphic',
    'esri/geometry/Extent',
    'esri/geometry/Multipoint',
    'esri/geometry/Point',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/renderers/UniqueValueRenderer',
    'esri/SpatialReference',
    'esri/symbols/PictureMarkerSymbol',
    'esri/tasks/GeometryService',
    'esri/tasks/IdentifyParameters',
    'esri/tasks/IdentifyTask',
    'esri/tasks/LegendLayer',
    'esri/tasks/PrintTask',
    'esri/tasks/PrintParameters',
    'esri/tasks/PrintTemplate',
    'esri/geometry/webMercatorUtils',
    'esri/urlUtils',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dnd/Moveable',
    'dojo/query',
    'dojo/on',
    'dojo/domReady!'
], function (
    Map,
    arcgisUtils,
    esriConfig,
    Geocoder,
    HomeButton,
    Legend,
    LocateButton,
    Measurement,
    PopupTemplate,
    Graphic,
    Extent,
    Multipoint,
    Point,
    ArcGISTiledMapServiceLayer,
    UniqueValueRenderer,
    SpatialReference,
    PictureMarkerSymbol,
    GeometryService,
    IdentifyParameters,
    IdentifyTask,
    LegendLayer,
    PrintTask,
    PrintParameters,
    PrintTemplate,
    webMercatorUtils,
    urlUtils,
    dom,
    domClass,
    Moveable,
    query,
    on
) {

    //bring this line back after experiment////////////////////////////
    //allLayers = mapLayers;

    esriConfig.defaults.io.corsEnabledServers.push("fwsprimary.wim.usgs.gov");
    esri.config.defaults.io.proxyUrl = "https://fwsprimary.wim.usgs.gov/serviceProxy/proxy.ashx";

    esriConfig.defaults.geometryService = new GeometryService("https://fwsprimary.wim.usgs.gov/server/rest/services/Utilities/Geometry/GeometryServer");

    /*urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/SecurePrinting/"
                        });

    urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands"
                        });

    urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands_Raster"
                        });

    urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands_Status"
                        });

    urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/Riparian"
                        });

    urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/Data_Source"
                        });

    urlUtils.addProxyRule({
                            proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                            urlPrefix: "http://52.70.106.103/arcgis/rest/services/Historic_Wetlands"
                        });*/

    map = new Map('mapDiv', {
        basemap: 'hybrid',
        extent: new Extent(-14638882.654811008, 2641706.3772205533, -6821514.898031538, 6403631.161302788, new SpatialReference({ wkid:3857 })),
        fitExtent: true
    });

    var home = new HomeButton({
        map: map,
        extent: new Extent(-14638882.654811008, 2641706.3772205533, -6821514.898031538, 6403631.161302788, new SpatialReference({ wkid:3857 }))
    }, "homeButton");
    home.startup();

    var locate = new LocateButton({
        map: map,
        scale: 4514,
    }, "locateButton");
    locate.startup();

    measurement = new Measurement({
        map: map,
        advancedLocationUnits: true
    }, dom.byId("measurementDiv"));
    measurement.startup();

    //var utmCoords = $('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');
    //$('.esriMeasurementResultTable').append(utmCoords);

    //following block forces map size to override problems with default behavior
    $(window).resize(function () {
        if ($("#legendCollapse").hasClass('in')) {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('height', maxLegendHeight);
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        }
        else {
            $('#legendElement').css('height', 'initial');
        }
    });

    function showPrintModal() {
        $('#printModal').modal('show');
    }

    $('#printNavButton').click(function(){
        showPrintModal();
    });

    $('#printExecuteButton').click(function (e) {
        e.preventDefault();
        $(this).button('loading');
        printMap();
    });

    $('#getDataButton').click(function(){
        showGetDataModal();
    });

    function showGetDataModal() {
        $('#getDataModal').modal('show');
    }

    $("#aboutLink").click(function() {
        $("#aboutModal").modal('show');
        $("#aboutTab").trigger('click');
    })

    $("#disclaimerLink").click(function() {
        $("#aboutModal").modal('show');
        $("#disclaimerTab").trigger('click');
    })

    $("#dataLimitationsLink").click(function() {
        $("#aboutModal").modal('show');
        $("#dataLimitationsTab").trigger('click');
    })

    $("#userCautionLink").click(function() {
        $("#aboutModal").modal('show');
        $("#userCautionTab").trigger('click');
    })
    /*aoiSymbol = new PictureMarkerSymbol("../images/grn-pushpin.png", 45, 45);

    renderer.addValue({
        symbol: aoiSymbol
    });*/

    $(".docs").hide();

    //displays map scale on map load
    on(map, "load", function() {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
        var initMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(initMapCenter.y.toFixed(3));
        $('#longitude').html(initMapCenter.x.toFixed(3));
        //map.setBasemap("topo");
        //map.setBasemap("hybrid");
    });
    //displays map scale on scale change (i.e. zoom level)
    on(map, "zoom-end", function () {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
    });

    //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
    on(map, "mouse-move", function (cursorPosition) {
        $('#mapCenterLabel').css("display", "none");
        if (cursorPosition.mapPoint != null) {
            var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
            $('#latitude').html(geographicMapPt.y.toFixed(3));
            $('#longitude').html(geographicMapPt.x.toFixed(3));
        }
    });
    //updates lat/lng indicator to map center after pan and shows "map center" label.
    on(map, "pan-end", function () {
        //displays latitude and longitude of map center
        $('#mapCenterLabel').css("display", "inline");
        var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(geographicMapCenter.y.toFixed(3));
        $('#longitude').html(geographicMapCenter.x.toFixed(3));
    });
    var usgsTopo = new ArcGISTiledMapServiceLayer('https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer');
    var nationalMapBasemap = new ArcGISTiledMapServiceLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');
    //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
    on(dom.byId('btnStreets'), 'click', function () {
        map.setBasemap('streets');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnSatellite'), 'click', function () {
        map.setBasemap('satellite');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnHybrid'), 'click', function () {
        map.setBasemap('hybrid');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnTerrain'), 'click', function () {
        map.setBasemap('terrain');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnGray'), 'click', function () {
        map.setBasemap('gray');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnNatGeo'), 'click', function () {
        map.setBasemap('national-geographic');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnOSM'), 'click', function () {
        map.setBasemap('osm');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });
    on(dom.byId('btnTopo'), 'click', function () {
        map.setBasemap('topo');
        map.removeLayer(nationalMapBasemap);
        map.removeLayer(usgsTopo);
    });

    on(dom.byId('btnNatlMap'), 'click', function () {
        map.addLayer(nationalMapBasemap, 1);
        map.removeLayer(usgsTopo);
    });

    on(dom.byId('btnUsgsTopo'), 'click', function () {
        map.addLayer(usgsTopo, 1);
        map.removeLayer(nationalMapBasemap);
    })

    $("#wetlandDiv").lobiPanel({
        unpin: false,
        reload: false,
        minimize: false,
        close: false,
        expand: false,
        editTitle: false,
        maxWidth: 800*.75,
        maxHeight: 500*.8
    });

    $("#wetlandDiv .dropdown").prepend("<div id='wetlandClose' title='close'></div>");

    $("#wetlandClose").click(function(){
        $("#wetlandDiv").css("visibility", "hidden");
        map.graphics.clear();
        //put highlight layer in here to hide when closed
        //map.infoWindow.hide();
    });

    identifyParams = new IdentifyParameters();
    identifyParams.tolerance = 0;
    identifyParams.returnGeometry = true;
    identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
    identifyParams.width  = map.width;
    identifyParams.height = map.height;
    //identifyTask = new esri.tasks.IdentifyTask("http://50.17.205.92/arcgis/rest/services/NAWQA/DecadalMap/MapServer");
    identifyTask = new IdentifyTask(allLayers[0].layers["Wetlands"].url);

    //code for adding draggability to infoWindow. http://www.gavinr.com/2015/04/13/arcgis-javascript-draggable-infowindow/
    var handle = query(".title", map.infoWindow.domNode)[0];
    var dnd = new Moveable(map.infoWindow.domNode, {
        handle: handle
    });

    // when the infoWindow is moved, hide the arrow:
    on(dnd, 'FirstMove', function() {
        // hide pointer and outerpointer (used depending on where the pointer is shown)
        var arrowNode =  query(".outerPointer", map.infoWindow.domNode)[0];
        domClass.add(arrowNode, "hidden");

        var arrowNode =  query(".pointer", map.infoWindow.domNode)[0];
        domClass.add(arrowNode, "hidden");
    }.bind(this));
    //end code for adding draggability to infoWindow

    //map click handler
    on(map, "click", function(evt) {

        if (aoiClicked == true) {
            aoiClicked = false;
            return;
        }

        if (measurement.activeTool != null) {
            return;//
        }

        map.graphics.clear();
        $("infoWindowLink").unbind("click");
        $("#zoomProjectLink").unbind("click");
        //map.infoWindow.hide();

        $("#wetlandDiv").css("visibility", "hidden");

        //alert("scale: " + map.getScale() + ", level: " + map.getLevel());

        identifyParams.geometry = evt.mapPoint;
        identifyParams.mapExtent = map.extent;

        if (map.getLevel() >= 12 && $("#huc-download-alert")[0].scrollHeight == 0) {
            //the deferred variable is set to the parameters defined above and will be used later to build the contents of the infoWindow.
            identifyTask = new IdentifyTask(allLayers[0].layers["Wetlands"].url);
            var deferredResult = identifyTask.execute(identifyParams);

            //Historic Wetland Identify task
            var historicIdentifyParameters = new IdentifyParameters();
            historicIdentifyParameters.returnGeometry = true;
            historicIdentifyParameters.tolerance = 0;
            historicIdentifyParameters.width = map.width;
            historicIdentifyParameters.height = map.height;
            historicIdentifyParameters.geometry = evt.mapPoint;
            historicIdentifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            historicIdentifyParameters.mapExtent = map.extent;
            historicIdentifyParameters.layerIds = [0,1];

            setCursorByID("mainDiv", "wait");
            map.setCursor("wait");

            var instance = $("#wetlandDiv").data('lobiPanel');
            var docHeight = $(document).height();
            var docWidth = $(document).width();
            var percentageOfScreen = 0.9;
            var wetlandHeight = docHeight*percentageOfScreen
            var wetlandWidth = docWidth*percentageOfScreen;
            var highChartWidth = 600;
            var highChartHeight = 325;
            if (docHeight < 500) {
                $("#wetlandDiv").height(wetlandHeight);
                highChartHeight = $("#floodToolsDiv").height() - 50;
            }
            if (docWidth < 500) {
                $("#wetlandDiv").width(wetlandWidth);
                highChartWidth = $("#floodToolsDiv").width() - 50;
            }

            var instanceX = docWidth*0.5-$("#wetlandDiv").width()*0.5;
            var instanceY = docHeight*0.5-$("#wetlandDiv").height()*0.5;

            if (initWetlandClicked == false) {
                instance.setPosition(instanceX, instanceY);
            }

            if (instance.isPinned() == true) {
                instance.unpin();
            }

            initWetlandClicked = true;

            $(".docs").hide();
            $(".docItems").empty();
            $("#reportInfo .panel-heading").addClass('loading-hide');
            $("#reportInfo .panel-body").addClass('loading-hide');
            $("#wetlandDiv").addClass('loading-background');
            $(".tab-pane").addClass('hidden-loading');



            deferredResult.addCallback(function(response) {

                if (response.length > 1) {

                    var feature;
                    var projFeature;
                    var attr;
                    var attrStatus;

                    var historicDocsParameters = new IdentifyParameters();
                    historicDocsParameters.returnGeometry = false;
                    historicDocsParameters.tolerance = 0;
                    historicDocsParameters.width = map.width;
                    historicDocsParameters.height = map.height;
                    historicDocsParameters.geometry = evt.mapPoint;
                    historicDocsParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
                    historicDocsParameters.mapExtent = map.extent;
                    historicDocsParameters.layerIds = [0,4];

                    var historicDocsTask = new IdentifyTask(allLayers[1].layers["Source Type"].url);
                    var deferredHistoricDocs = historicDocsTask.execute(historicDocsParameters);

                    deferredHistoricDocs.addCallback(function(response) {

                        if (response.length >= 1) {

                            for (var j = 0; j < response.length; j++) {
                                response[j].year = response[j].feature.attributes.Year;
                            }

                            response.sort(function(a, b){return b.year - a.year});

                            for (var i = 0; i < response.length; i++) {
                                
                                var attr = response[i].feature.attributes;
                                if (response[i].layerName == "Historic map information") {
                                    $("#historicDocs").show();
                                    $("#historicDocs .docItems").append("<a target='_blank' href='" + attr.PDF_HYPERLINK + "'>" + attr.PDF_NAME + "</a>");
                                } else {
                                    $("#" + response[i].value.toLowerCase() + "Docs").show();
                                    $("#" + response[i].value.toLowerCase() + "Docs .docItems").append("<a target='_blank' href='" + attr.URL + "'>" + attr.Title + "</a>");
                                }

                            }
                        }

                        $("#reportInfo .panel-heading").removeClass('loading-hide');
                        $("#reportInfo .panel-body").removeClass('loading-hide');
                        $("#wetlandDiv").removeClass('loading-background');
                        $(".tab-pane").removeClass('hidden-loading');

                    });

                    $("#wetlandTab").trigger('click');

                    $("#wetlandDiv").css("visibility", "visible");

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].layerId == 0) {
                            feature = response[i].feature;
                            attr = feature.attributes;
                        } else if (response[i].layerId == 1) {
                            attrStatus = response[i].feature.attributes;
                            projFeature = response[i].feature;
                        }
                    }

                    // Code for adding wetland highlight
                    var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([255,255,0]), 2), new dojo.Color([98,194,204,0])
                    );
                    feature.geometry.spatialReference = map.spatialReference;
                    var graphic = feature;
                    graphic.setSymbol(symbol);

                    map.graphics.add(graphic);

                    /*var projmeta = '';
                    if (attrStatus.SUPPMAPINFO == 'None') {
                        projmeta = " NONE";
                    } else {
                        projmeta = " <a target='_blank' href='" + attrStatus.SUPPMAPINFO + "'>click here</a>";
                    }

                    if (attrStatus.IMAGE_DATE == "<Null>" || attrStatus.IMAGE_DATE == "0" || attrStatus.IMAGE_DATE == 0) {
                        attrStatus.IMAGE_DATE = projmeta;
                    }*/

                    /*var template = new esri.InfoTemplate("Wetland",
                        "<b>Classification:</b> " + attr.ATTRIBUTE + " (<a target='_blank' href='https://fwsprimary.wim.usgs.gov/decoders/wetlands.aspx?CodeURL=" + attr.ATTRIBUTE + "''>decode</a>)<br/>"+
                        "<p><b>Wetland Type:</b> " + attr.WETLAND_TYPE + "<br/>" +
                        "<b>Acres:</b> " + Number(attr.ACRES).toFixed(2) + "<br/>" +
                        "<b>Image Date(s):</b> " + attrStatus.IMAGE_DATE + "<br/>" +
                        "<b>Project Metadata:</b>" + projmeta +
                        "<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");*/

                    //$("#generalInfo").empty();

                    /*$("#generalInfo").append("<b>Classification:</b> " + attr.ATTRIBUTE + " (<a target='_blank' href='https://fwsprimary.wim.usgs.gov/decoders/wetlands.aspx?CodeURL=" + attr.ATTRIBUTE + "''>decode</a>)<br/>"+
                        "<p><b>Wetland Type:</b> " + attr.WETLAND_TYPE + "<br/>" +
                        "<b>Acres:</b> " + Number(attr.ACRES).toFixed(2) + "<br/>" +
                        "<b>Image Date(s):</b> " + attrStatus.IMAGE_DATE + "<br/>" +
                        "<b>Project Metadata:</b>" + projmeta +
                        "<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");*/

                    //$("#generalInfo").append("<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");

                    $("#acreage").text(Number(attr.ACRES).toFixed(2));
                    $("#wetlandCode").text(attr.ATTRIBUTE);
                    $("#wetlandType").text(attr.WETLAND_TYPE);
                    $("#decoderLink").click(function(evt) {
                        $("#descriptionTab").trigger('click');
                    });
                    //$("#decoderLink").attr('href', "https://fwsprimary.wim.usgs.gov/decoders/wetlands.aspx?CodeURL=" + attr.ATTRIBUTE);
                    
                    if (attrStatus.SOURCE_TYPE != "Scalable") {
                        if (attrStatus.IMAGE_SCALE > 10) {
                            $("#imageScalePopup").html("The wetlands and deepwater habitats in this area were photo interpreted using <b>1:" + addCommas(attrStatus.IMAGE_SCALE) + "</b>" + " scale, ");
                        } else if (attrStatus.IMAGE_SCALE != 0) {
                            $("#imageScalePopup").html("The wetlands and deepwater habitats in this area were photo interpreted using <b>" + attrStatus.IMAGE_SCALE + " meter digital</b>, ");
                        }
                    } else {
                        $("#imageScalePopup").html("");
                    }
                    
                    if (attrStatus.SOURCE_TYPE == "Scalable") {//
                        $("#sourceTypePopup").html("The data in this area are considered an interim scalable map product. Click <a target='_blank' href='https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf'>here</a> for a full description of Scalable Wetland Mapping. ");
                    } else {
                        $("#sourceTypePopup").html("<b>" + getSourceTypeText(attrStatus.SOURCE_TYPE) + "</b> imagery from <b>" + getImageDate(attrStatus.IMAGE_YR) + "</b>. ");
                    }
                    
                    function getImageDate(imageDate) {
                        var date;
                        if (imageDate == 0 || imageDate == "<Null>") {
                            date = "<a target='_blank' href='https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf'>Link</a>";
                        } else {
                            date = imageDate;
                        }
                        return date;
                    }
                    


                    if (attrStatus.SUPPMAPINFO != 'None') {
                        $("#suppMapInfo").empty();
                        $("#suppMapInfo").append('Click <a id="suppMapInfoLink" target="_blank" href="' + attrStatus.SUPPMAPINFO + '">here</a> for project specific mapping conventions and information.')
                    }

                    //code here populates the Description tab
                    var attr_array = ["ATTRIBUTE","SYSTEM","SYSTEM_NAME","SYSTEM_DEFINITION","SUBSYSTEM","SUBSYSTEM_NAME","SUBSYSTEM_DEFINITION","CLASS","CLASS_NAME","CLASS_DEFINITION","SUBCLASS","SUBCLASS_NAME","SUBCLASS_DEFINITION","SPLIT_CLASS","SPLIT_CLASS_NAME","SPLIT_CLASS_DEFINITION","SPLIT_SUBCLASS","SPLIT_SUBCLASS_NAME","SPLIT_SUBCLASS_DEFINITION","WATER_REGIME","WATER_REGIME_NAME","WATER_REGIME_SUBGROUP","WATER_REGIME_DEFINITION","MODIFIER_1","MODIFIER_1_NAME","MODIFIER_1_GROUP","MODIFIER_1_SUBGROUP","MODIFIER_1_DEFINITION","MODIFIER_2","MODIFIER_2_NAME","MODIFIER_2_GROUP","MODIFIER_2_SUBGROUP","MODIFIER_2_DEFINITION","MODIFIER_3","MODIFIER_3_NAME","MODIFIER_3_GROUP","MODIFIER_3_SUBGROUP","MODIFIER_3_DEFINITION",];
                    
                    $.each(attr_array, function (index) {
                        var att = attr_array[index]
                        var val = attr[att];
                        if (val != "Null") {
                            $("#des" + att).html(attr[att]);
                            $("#des" + att).show();
                        } else {
                            if ($("#des" + att).parent().hasClass("decoder-group")) {
                                $("#des" + att).parent().hide();
                            }
                        }
                    });

                    function attrCheck(attr) {
                        return attr;
                    }

                    //ties the above defined InfoTemplate to the feature result returned from a click event

                    //feature.setInfoTemplate(template          
                    //map.infoWindow.setFeatures([feature]);
                    //map.infoWindow.show(evt.mapPoint, map.getInfoWindowAnchor(evt.screenPoint));

                    var infoWindowClose = dojo.connect(map.infoWindow, "onHide", function(evt) {
                        map.graphics.clear();
                        dojo.disconnect(map.infoWindow, infoWindowClose);
                        $("infoWindowLink").unbind("click");
                        $("#zoomProjectLink").unbind("click");
                    });

                    setCursorByID("mainDiv", "default");
                    map.setCursor("default");

                    $("#infoWindowLink").click(function(event) {
                        var convertedGeom = webMercatorUtils.webMercatorToGeographic(feature.geometry);

                        var featExtent = convertedGeom.getExtent();

                        map.setExtent(featExtent, true);
                    });

                    $("#zoomProjectLink").click(function(event) {
                        var convertedGeom = webMercatorUtils.webMercatorToGeographic(projFeature.geometry);

                        var featExtent = convertedGeom.getExtent();

                        map.setExtent(featExtent, true);

                        // Code for adding wetland project area highlight
                        var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color([255,255,0]), 2), new dojo.Color([98,194,204,0])
                        );
                        projFeature.geometry.spatialReference = map.spatialReference;
                        var graphic = projFeature;
                        graphic.setSymbol(symbol);

                        map.graphics.add(graphic);
                    });

                    //map.infoWindow.show(evt.mapPoint);

                } else if (response.length <= 1) {

                    identifyTask = new IdentifyTask(allLayers[0].layers["Riparian"].url);

                    var deferredResult = identifyTask.execute(identifyParams);

                    deferredResult.addCallback(function(response) {

                        if (response.length > 1) {

                            var feature;
                            var projFeature;
                            var attr;
                            var attrStatus;

                            for (var i = 0; i < response.length; i++) {
                                if (response[i].layerId == 0) {
                                    feature = response[i].feature;
                                    attr = feature.attributes;
                                } else if (response[i].layerId == 1) {
                                    attrStatus = response[i].feature.attributes;
                                    projFeature = response[i].feature;
                                }

                            }

                            // Code for adding wetland highlight
                            var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                new dojo.Color([255,255,0]), 2), new dojo.Color([98,194,204,0])
                            );
                            feature.geometry.spatialReference = map.spatialReference;
                            var graphic = feature;
                            graphic.setSymbol(symbol);

                            map.graphics.add(graphic);

                            var projmeta = '';
                            if (attrStatus.SUPPMAPINFO == 'None') {
                                projmeta = " NONE";
                            } else {
                                projmeta = " <a target='_blank' href='" + attrStatus.SUPPMAPINFO + "'>click here</a>";
                            }

                            /*var template = new esri.InfoTemplate("Riparian",
                                "<b>Classification:</b> " + attr.ATTRIBUTE + " (<a target='_blank' href='https://fwsprimary.wim.usgs.gov/decoders/riparian.aspx?CodeURL=" + attr.ATTRIBUTE + "''>decode</a>)<br/>"+
                                "<p><b>Wetland Type:</b> " + attr.WETLAND_TYPE + "<br/>" +
                                "<b>Acres:</b> " + Number(attr.ACRES).toFixed(2) + "<br/>" +
                                "<b>Image Date(s):</b> " + attrStatus.IMAGE_DATE + "<br/>" +
                                "<b>Project Metadata:</b>" + projmeta +
                                "<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");*/

                            //ties the above defined InfoTemplate to the feature result returned from a click event

                            $("#acreage").text(Number(attr.ACRES).toFixed(2));
                            $("#wetlandCode").text(attr.ATTRIBUTE);
                            $("#wetlandType").text(attr.WETLAND_TYPE);
                            $("#decoderLink").click(function(evt) {
                                $("#descriptionTab").trigger('click');
                            });
                            //$("#decoderLink").attr('href', "https://fwsprimary.wim.usgs.gov/decoders/riparian.aspx?CodeURL=" + attr.ATTRIBUTE);
                            $("#imageScalePopup").text(addCommas(attrStatus.IMAGE_SCALE));
                            $("#sourceTypePopup").text(getSourceTypeText(attrStatus.SOURCE_TYPE));
                            if (attrStatus.IMAGE_DATE == 0) {
                                $("#imageDate").append("<a target='_blank' href='https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf'>Link</a>");
                            } else {
                                $("#imageDate").text(attrStatus.IMAGE_DATE);
                            }
                            $("#suppMapInfoLink").attr('href', attrStatus.SUPPMAPINFO);


                            /*if (attrStatus.IMAGE_DATE == 0) {
                                //$("#imageDate").append("<a target='_blank' href='https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf'>Link</a>");
                            } else {
                                $("#imageDate").text(attrStatus.IMAGE_DATE);
                            }*/

                            //feature.setInfoTemplate(template);

                            //map.infoWindow.setFeatures([feature]);
                            //map.infoWindow.show(evt.mapPoint);

                            var infoWindowClose = dojo.connect(map.infoWindow, "onHide", function(evt) {
                                map.graphics.clear();
                                dojo.disconnect(map.infoWindow, infoWindowClose);
                                $("infoWindowLink").unbind("click");
                                $("#zoomProjectLink").unbind("click");
                            });

                            setCursorByID("mainDiv", "default");
                            map.setCursor("default");

                            $("#infoWindowLink").click(function(event) {
                                var convertedGeom = webMercatorUtils.webMercatorToGeographic(feature.geometry);

                                var featExtent = convertedGeom.getExtent();

                                map.setExtent(featExtent, true);
                            });

                            $("#zoomProjectLink").click(function(event) {
                                var convertedGeom = webMercatorUtils.webMercatorToGeographic(projFeature.geometry);

                                var featExtent = convertedGeom.getExtent();

                                map.setExtent(featExtent, true);

                                // Code for adding wetland project area highlight
                                var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                    new dojo.Color([255,255,0]), 2), new dojo.Color([98,194,204,0])
                                );
                                projFeature.geometry.spatialReference = map.spatialReference;
                                var graphic = projFeature;
                                graphic.setSymbol(symbol);

                                map.graphics.add(graphic);
                            });

                            //map.infoWindow.show(evt.mapPoint);

                        } else if (response.length <= 1) {

                            var historicIdentifyTask = new IdentifyTask(allLayers[2].layers["Historic Wetland Data"].url);
                            var deferredHistoric = historicIdentifyTask.execute(historicIdentifyParameters);

                            deferredHistoric.addCallback(function(response) {

                                if (response.length >= 1) {

                                    var feature;
                                    var attr;
                                    var attrStatus;

                                    for (var i = 0; i < response.length; i++) {
                                        if (response[i].layerId == 0) {
                                            feature = response[i].feature;
                                            attr = feature.attributes;
                                        } else if (response[i].layerId == 1) {
                                            attrStatus = response[i].feature.attributes;
                                        }

                                    }

                                    // Code for adding wetland highlight
                                    var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                            new dojo.Color([255,255,0]), 2), new dojo.Color([98,194,204,0])
                                    );
                                    feature.geometry.spatialReference = map.spatialReference;
                                    var graphic = feature;
                                    graphic.setSymbol(symbol);

                                    map.graphics.add(graphic);

                                    var projmeta = '';
                                    if (attrStatus.SUPPMAPINFO == 'None') {
                                        projmeta = " NONE";
                                    } else {
                                        projmeta = " <a target='_blank' href='" + attrStatus.SUPPMAPINFO + "'>click here</a>";
                                    }

                                    if (attrStatus.IMAGE_DATE == "<Null>" || attrStatus.IMAGE_DATE == "0" || attrStatus.IMAGE_DATE == 0) {
                                        attrStatus.IMAGE_DATE = projmeta;
                                    }

                                    var template = new esri.InfoTemplate("Historic Wetland",
                                        "<p><b>Wetland Type:</b> " + attr.WETLAND_TYPE + "<br/>" +
                                        "<b>Acres:</b> " + Number(attr.ACRES).toFixed(2) + "<br/>" +
                                        "<b>Project Metadata:</b>" + projmeta +
                                        "<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");

                                    //ties the above defined InfoTemplate to the feature result returned from a click event

                                    feature.setInfoTemplate(template);

                                    map.infoWindow.setFeatures([feature]);
                                    map.infoWindow.show(evt.mapPoint, map.getInfoWindowAnchor(evt.screenPoint));

                                    var infoWindowClose = dojo.connect(map.infoWindow, "onHide", function(evt) {
                                        map.graphics.clear();
                                        dojo.disconnect(map.infoWindow, infoWindowClose);
                                        $("infoWindowLink").unbind("click");
                                    });

                                    setCursorByID("mainDiv", "default");
                                    map.setCursor("default");

                                    $("#infoWindowLink").click(function(event) {
                                        var convertedGeom = webMercatorUtils.webMercatorToGeographic(feature.geometry);

                                        var featExtent = convertedGeom.getExtent();

                                        map.setExtent(featExtent, true);
                                    });

                                    //map.infoWindow.show(evt.mapPoint);

                                } else {
                                    setCursorByID("mainDiv", "default");
                                    map.setCursor("default");
                                    map.infoWindow.hide();
                                }
                            });
                        }
                    });
                }
            });
        } else if ($("#huc-download-alert")[0].scrollHeight > 0) {
            //watershed identify task
            //watershedGraphicsLayer.clear();
            var identifyParameters = new IdentifyParameters();
            identifyParameters.returnGeometry = true;
            identifyParameters.tolerance = 0;
            identifyParameters.width = map.width;
            identifyParameters.height = map.height;
            identifyParameters.geometry = evt.mapPoint;
            identifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_TOP;
            identifyParameters.mapExtent = map.extent;
            identifyParameters.spatialReference = map.spatialReference;

            var identifyTask = new IdentifyTask(allLayers[0].layers["HUC8"].url);
            var hucDeffered = identifyTask.execute(identifyParameters);

            hucDeffered.addCallback(function(response) {
                if (response.length >= 1) {

                    var feature;
                    feature = response[0].feature;

                    // Code for adding HUC highlight
                    var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color([255,255,0]), 2), new dojo.Color([98,194,204,0])
                    );
                    feature.geometry.spatialReference = map.spatialReference;
                    var graphic = feature;
                    graphic.setSymbol(symbol);

                    map.graphics.add(graphic);

                    var convertedGeom = webMercatorUtils.webMercatorToGeographic(feature.geometry);

                    var featExtent = convertedGeom.getExtent();

                    map.setExtent(featExtent, true);

                    var HUCNumber = response[0].feature.attributes.HUC8;
                    var HUCName = response[0].feature.attributes.Name;
                    dojo.byId('innerAlert').innerHTML = "<h4><b>Download Data</b></h4>" +
                        "<p>Click the link below to download data for " + HUCName + " watershed" +
                        "<br/><p onclick='hucLinkListener("+HUCNumber.toString()+")'><a target='_blank' href='http://www.fws.gov/wetlands/downloads/Watershed/HU8_" + HUCNumber + "_watershed.zip'>HUC " + HUCNumber + "</a></p>";
                }
            });
        }
    });

    function getSourceTypeText(source_type_code) {
        var source_type_text = "";
        switch(source_type_code) {
            case "CIR":
                source_type_text = "Color Infrared";
                break;
            case "TC":
                source_type_text = "True Color";
                break;
            case "BW":
                source_type_text = "Black and White";
                break;
        }
        return source_type_text;
    }

    $(document).on("click", "#showHUCs", function() {
        event.preventDefault();
        $("#getDataModal").modal("hide");
        $("#huc-download-alert").slideDown(250);
        map.getLayer("huc8").setVisibility(true);
        dojo.byId('innerAlert').innerHTML = "<h4><b>Download Data</b></h4>" +
        "<p>Please review the Data Download (<a target='_blank' href='https://www.fws.gov/wetlands/Data/Data-Download.html'>www.fws.gov/wetlands/Data/Data-Download.html</a>) page for information on how to download data, what is included in the download and data use limitations and disclaimer.</p>" +
        "<br/><p><b>Click the map to select a watershed from which to extract wetland data.</b></p>";
    });

    var geocoder = new Geocoder({
        value: '',
        maxLocations: 25,
        autoComplete: true,
        arcgisGeocoder: true,
        autoNavigate: false,
        map: map
    }, 'geosearch');
    geocoder.startup();
    geocoder.on('select', geocodeSelect);
    geocoder.on('findResults', geocodeResults);
    geocoder.on('clear', clearFindGraphics);
    on(geocoder.inputNode, 'keydown', function (e) {
        if (e.keyCode == 13) {
            setSearchExtent();
        }
    });

    // Symbols
    var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);

    map.on('load', function (){
        map.infoWindow.set('highlight', false);
        map.infoWindow.set('titleInBody', false);
    });

    // Geosearch functions
    on(dom.byId('btnGeosearch'),'click', geosearch);

    // Optionally confine search to map extent
    function setSearchExtent (){
        geocoder.activeGeocoder.searchExtent = null;
        /*if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = map.extent;
        } else {
            geocoder.activeGeocoder.searchExtent = null;
        }*/
    }
    function geosearch() {
        setSearchExtent();
        var def = geocoder.find();
        def.then(function (res){
            geocodeResults(res);
        });
    }
    function geocodeSelect(item) {
        clearFindGraphics();
        var g = (item.graphic ? item.graphic : item.result.feature);
        g.setSymbol(sym);
        //addPlaceGraphic(item.result,g.symbol);
        // Close modal
        //$('#geosearchModal').modal('hide');
    }
    function geocodeResults(places) {
        places = places.results;
        if (places.length > 0) {
            clearFindGraphics();
            var symbol = sym;
            // Create and add graphics with pop-ups
            for (var i = 0; i < places.length; i++) {
                //addPlaceGraphic(places[i], symbol);
            }
            //zoomToPlaces(places);
            if (places[0].extent != null && places[0].extent.xmax != "NaN" && places[0].extent.xmin != places[0].extent.xmax) {
                map.setExtent(places[0].extent, true)
                //map.setLevel(12);
                $(".geosearchWarning").hide();
                // Close modal
                $('#geosearchModal').modal('hide');
            } else if ((places[0].feature.geometry != null && places[0].feature.geometry.x != "NaN")) {
                var centerPoint = new Point(places[0].feature.geometry);
                map.centerAndZoom(centerPoint, 17);
                $(".geosearchWarning").hide();
                // Close modal
                $('#geosearchModal').modal('hide');
            } else {
                // code to give warning to the user that the search didn't work
                $(".geosearchWarning").show();
            }
        } else {
            //alert('Sorry, address or place not found.');  // TODO
        }
    }
    function stripTitle(title) {
        var i = title.indexOf(',');
        if (i > 0) {
            title = title.substring(0,i);
        }
        return title;
    }
    function addPlaceGraphic(item,symbol)  {
        var place = {};
        var attributes,infoTemplate,pt,graphic;
        pt = item.feature.geometry;
        place.address = item.name;
        place.score = item.feature.attributes.Score;
        // Graphic components
        attributes = { address:stripTitle(place.address), score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
        infoTemplate = new PopupTemplate({title:'{address}', description: 'Latitude: {lat}<br/>Longitude: {lon}'});
        graphic = new Graphic(pt,symbol,attributes,infoTemplate);
        // Add to map
        map.graphics.add(graphic);
    }

    function zoomToPlaces(places) {
        var multiPoint = new Multipoint(map.spatialReference);
        for (var i = 0; i < places.length; i++) {
            multiPoint.addPoint(places[i].feature.geometry);
        }
        map.setExtent(multiPoint.getExtent().expand(2.0));
    }

    function clearFindGraphics() {
        map.infoWindow.hide();
        map.graphics.clear();
    }

    function createPictureSymbol(url, xOffset, yOffset, xWidth, yHeight) {
        return new PictureMarkerSymbol(
            {
                'angle': 0,
                'xoffset': xOffset, 'yoffset': yOffset, 'type': 'esriPMS',
                'url': url,
                'contentType': 'image/png',
                'width':xWidth, 'height': yHeight
            });
    }

    function printMap() {

        var printParams = new PrintParameters();
        printParams.map = map;

        var template = new PrintTemplate();
        template.exportOptions = {
            width: 500,
            height: 400,
            dpi: 300
        };
        template.format = "PDF";
        template.layout = "Letter ANSI A Landscape test";
        template.preserveScale = false;
        var wetlandsLegendLayer = new LegendLayer();
        wetlandsLegendLayer.layerId = "wetlands";
        var wetlandsRasterLegendLayer = new LegendLayer();
        wetlandsRasterLegendLayer.layerId = "wetlandsRaster"
        //legendLayer.subLayerIds = [*];

        var userTitle = $("#printTitle").val();
        //if user does not provide title, use default. otherwise apply user title
        if (userTitle == "") {
            template.layoutOptions = {
                "titleText": "Wetlands",
                "authorText" : "National Wetlands Inventory (NWI)",
                "copyrightText": "This page was produced by the NWI mapper",
                "legendLayers": [wetlandsLegendLayer,wetlandsRasterLegendLayer]
            };
        } else {
            template.layoutOptions = {
                "titleText": userTitle,
                "authorText" : "National Wetlands Inventory (NWI)",
                "copyrightText": "This page was produced by the NWI mapper",
                "legendLayers": [wetlandsLegendLayer,wetlandsRasterLegendLayer]
            };
        }

        //"legendLayers": [legendLayer]
        var docTitle = template.layoutOptions.titleText;
        printParams.template = template;
        var printMap = new PrintTask("https://fwsprimary.wim.usgs.gov/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
        printMap.execute(printParams, printDone, printError);

        $.get("https://fwsprimary.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo=" + map.getScale() + "," + map.extent.xmin + "," + map.extent.ymax + "," + map.extent.xmax + "," + map.extent.ymin + ",NWIV2", function(data) {
           //console.log(data);
        });

        function printDone(event) {
            //alert(event.url);
            //window.open(event.url, "_blank");
            printCount++;
            //var printJob = $('<a href="'+ event.url +'" target="_blank">Printout ' + printCount + ' </a>');
            var printJob = $('<p><label>' + printCount + ': </label>&nbsp;&nbsp;<a href="'+ event.url +'" target="_blank">' + docTitle +' </a></p>');
            //$("#print-form").append(printJob);
            $("#printJobsDiv").find("p.toRemove").remove();
            $("#printModalBody").append(printJob);
            $("#printTitle").val("");
            $("#printExecuteButton").button('reset');
        }

        function printError(event) {
            alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem");
        }
    }

    function setCursorByID(id,cursorStyle) {
        var elem;
         if (document.getElementById &&
            (elem=document.getElementById(id)) ) {
            if (elem.style) elem.style.cursor=cursorStyle;
         }
    }

    // Show modal dialog; handle legend sizing (both on doc ready)
    $(document).ready(function(){
        function showModal() {
            $('#geosearchModal').modal('show');
        }
        // Geosearch nav menu is selected
        $('#geosearchNav').click(function(){
            showModal();
        });

        function showAboutModal () {
            $('#aboutModal').modal('show');
        }
        $('#aboutNav').click(function(){
            showAboutModal();
        });

        $("#html").niceScroll();
        $("#sidebar").niceScroll();
        $("#sidebar").scroll(function () {
            $("#sidebar").getNiceScroll().resize();
        });

        maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
        $('#legendElement').css('max-height', maxLegendHeight);
        maxLegendDivHeight = (maxLegendHeight) - parseInt($('#legendHeading').css("height").replace('px',''));
        $('#legendDiv').css('max-height', maxLegendDivHeight);

        $('#legendCollapse').on('shown.bs.collapse', function () {
            if (legendDiv.innerHTML.length == 0 ) {
                var legend = new Legend({
                    map: map,
                    layerInfos: legendLayers
                }, "legendDiv");
                legend.startup();

                $("#legendDiv").niceScroll();

                /*legend.addCallback(function(response) {
                    maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
                    $('#legendElement').css('max-height', maxLegendHeight);
                    maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
                    $('#legendDiv').css('max-height', maxLegendDivHeight);
                });*/
            }
        });

        $('#legendCollapse').on('hide.bs.collapse', function () {
            $('#legendElement').css('height', 'initial');
        });

        $('#measurementCollapse').on('shown.bs.collapse', function () {
            //show label when the collapse panel is expanded(for mobile, where label is hidden while collapsed)
            $('#measureLabel').show();
        });
        $('#measurementCollapse').on('hide.bs.collapse', function () {
            //hide label on collapse if window is small (mobile)
            if (window.innerWidth <= 767){
                $('#measureLabel').hide();
            }
        });

    });

    require([
        'esri/InfoTemplate',
        'esri/tasks/locator',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphicsUtils',
        'esri/geometry/Point',
        'esri/geometry/Extent',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/ArcGISImageServiceLayer',
        'esri/layers/FeatureLayer',
        'esri/layers/WMSLayer',
        'esri/layers/WMSLayerInfo',
        'esri/tasks/GeometryService',
        'dijit/form/CheckBox',
        'dijit/form/RadioButton',
        'dojo/query',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-construct',
        'dojo/dom-style',
        'dojo/on'
    ], function(
        InfoTemplate,
        Locator,
        Query,
        QueryTask,
        graphicsUtils,
        Point,
        Extent,
        ArcGISDynamicMapServiceLayer,
        ArcGISImageServiceLayer,
        FeatureLayer,
        WMSLayer,
        WMSLayerInfo,
        GeometryService,
        CheckBox,
        RadioButton,
        query,
        dom,
        domClass,
        domConstruct,
        domStyle,
        on
    ) {

        var layersObject = [];
        var layerArray = [];
        var staticLegendImage;
        var identifyTask, identifyParams;
        var navToolbar;
        var locator;

        var geomService = new GeometryService("https://fwsprimary.wim.usgs.gov/server/rest/services/Utilities/Geometry/GeometryServer");

        //create global layers look
        var mapLayers = [];

        $.each(allLayers, function (index,group) {
            console.log('processing: ', group.groupHeading)


            //sub-loop over layers within this groupType
            $.each(group.layers, function (layerName,layerDetails) {



                //check for exclusiveGroup for this layer
                var exclusiveGroupName = '';
                if (layerDetails.wimOptions.exclusiveGroupName) {
                    exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
                }

                if (layerDetails.wimOptions.layerType === 'agisFeature') {
                    var layer = new FeatureLayer(layerDetails.url, layerDetails.options);
                    if (layerDetails.wimOptions.renderer !== undefined) {
                        layer.setRenderer(layerDetails.wimOptions.renderer);
                    }
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.unshift({layer:layer, title: layerName});
                    }
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisWMS') {
                    var layer = new WMSLayer(layerDetails.url, {resourceInfo: layerDetails.options.resourceInfo, visibleLayers: layerDetails.options.visibleLayers }, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.unshift({layer:layer, title: layerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
                    var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.visibleLayers) {
                        layer.setVisibleLayers(layerDetails.visibleLayers);
                    }
                    if (layerDetails.wimOptions && layerDetails.wimOptions.layerDefinitions) {
                        var layerDefs = [];
                        $.each(layerDetails.wimOptions.layerDefinitions, function (index, def) {
                            layerDefs[index] = def;
                        });
                        layer.setLayerDefinitions(layerDefs);
                    }
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.unshift({layer:layer, title: layerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisImage') {
                    var layer = new ArcGISImageServiceLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.unshift({layer:layer, title: layerName});
                    }
                    if (layerDetails.visibleLayers) {
                        layer.setVisibleLayers(layerDetails.visibleLayers);
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }
            });
        });

        function addLayer(groupHeading, showGroupHeading, layer, layerName, exclusiveGroupName, options, wimOptions) {

            //add layer to map
            //layer.addTo(map);
            map.addLayer(layer);

            if (wimOptions.legendLabel == false) {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '[id*=' + layer.id + '] .esriLegendLayerLabel { display: none; }';
                document.getElementsByTagName('head')[0].appendChild(style);
            }

            if (layer.id == 'aoi') {
                on(layer, 'load', function(evt) {
                    on(layer, 'click', function (evt) {
                        aoiClicked = true;
                        var linkValue = evt.graphic.attributes.HYPERLINK_2;
                        if (linkValue == "None") {
                            var template = new InfoTemplate("${NAME}",
                                "Type: ${TYPE}<br/>" +
                                "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
                                "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
                                "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
                            );
                            layer.setInfoTemplate(template);
                        } else {//
                            var template = new InfoTemplate("${NAME}",
                                "Type: ${TYPE}<br/>" +
                                "Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>" +
                                "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
                                "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
                                "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
                            );
                            layer.setInfoTemplate(template);
                        }
                    });
                });
            }

            //add layer to layer list
            mapLayers.push([exclusiveGroupName,camelize(layerName),layer]);

            //check if its an exclusiveGroup item
            if (exclusiveGroupName) {

                if (!$('#' + camelize(exclusiveGroupName)).length) {
                    var exGroupRoot;
                    if (exclusiveGroupName == "Data Source") {
                        var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName +" Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '<span id="info' + camelize(exclusiveGroupName) + '" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(exclusiveGroupName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');
                    } else {
                        var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName +" Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '</button> </div>');
                    }

                    exGroupRoot.click(function(e) {
                        exGroupRoot.find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');

                        $.each(mapLayers, function (index, currentLayer) {

                            var tempLayer = map.getLayer(currentLayer[2].id);

                            if (currentLayer[0] == exclusiveGroupName) {
                                if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o') && exGroupRoot.find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                } else if (exGroupRoot.find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('removing layer: ',currentLayer[1]);
                                    //map.removeLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(false);
                                }
                            }

                        });
                    });

                    var exGroupDiv = $('<div id="' + camelize(exclusiveGroupName) + '" class="btn-group-vertical" data-toggle="buttons"></div>');
                    $('#toggle').append(exGroupDiv);
                }

                //create radio button
                //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
                if (layer.visible) {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                } else {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                }

                $('#' + camelize(exclusiveGroupName)).append(button);

                //click listener for radio button
                button.click(function(e) {

                    if ($(this).find('i.glyphspan').hasClass('fa-circle-o')) {
                        $(this).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');

                        var newLayer = $(this)[0].id;

                        $.each(mapLayers, function (index, currentLayer) {

                            if (currentLayer[0] == exclusiveGroupName) {
                                if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                    //$('#' + camelize(currentLayer[1])).toggle();
                                }
                                else if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('group heading not checked');
                                }
                                else {
                                    console.log('removing layer: ',currentLayer[1]);
                                    //map.removeLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(false);
                                    if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o')) {
                                        $("#" + currentLayer[1]).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');
                                    }
                                    //$('#' + camelize(this[1])).toggle();
                                }
                            }
                        });
                    }
                });
            }

            //not an exclusive group item
            else if (wimOptions.includeInLayerList) {

                //create layer toggle
                //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
                if ((layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                } else if ((!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                } else if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                } else if ((!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                } else if ((layer.visible && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                } else if ((!layer.visible && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                } else if (layer.visible) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '</button></span></div>');
                } else {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '</button> </div>');
                }


                //click listener for regular
                button.click(function(e) {

                    //toggle checkmark
                    $(this).find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');
                    $(this).find('button').button('toggle');



                    //$('#' + camelize(layerName)).toggle();

                    //layer toggle
                    if (layer.visible) {
                        layer.setVisibility(false);
                    } else {
                        layer.setVisibility(true);
                    }

                    if (wimOptions.otherLayersToggled) {
                        $.each(wimOptions.otherLayersToggled, function (key, value) {
                            var lyr = map.getLayer(value);
                            lyr.setVisibility(layer.visible);
                        });
                    }

                });
            }

            //group heading logic
            if (showGroupHeading !== undefined) {

                //camelize it for divID
                var groupDivID = camelize(groupHeading);

                //check to see if this group already exists
                if (!$('#' + groupDivID).length) {
                    //if it doesn't add the header
                    if (showGroupHeading) {
                        var groupDiv = $('<div id="' + groupDivID + '"><div class="alert alert-info" role="alert"><strong>' + groupHeading + '</strong></div></div>');
                    } else {
                        var groupDiv = $('<div id="' + groupDivID + '"></div>');
                    }
                    $('#toggle').append(groupDiv);
                }

                //if it does already exist, append to it

                if (exclusiveGroupName) {
                    //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
                    $('#' + groupDivID).append(exGroupRoot);
                    $('#' + groupDivID).append(exGroupDiv);
                    if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                        var id = "#info" + camelize(exclusiveGroupName);
                        var moreinfo = $(id);
                        moreinfo.click(function(e) {
                            window.open(wimOptions.moreinfo, "_blank");
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    }
                    if ($("#opacity"+camelize(exclusiveGroupName)).length > 0) {
                        var id = "#opacity" + camelize(exclusiveGroupName);
                        var opacity = $(id);
                        opacity.click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(".opacitySlider").remove();
                            var currOpacity = map.getLayer(options.id).opacity;
                            var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                            $("body").append(slider);
                            $("#slider")[0].value = currOpacity * 100;
                            $(".opacitySlider").css('left', event.clientX - 180);
                            $(".opacitySlider").css('top', event.clientY - 50);

                            $(".opacitySlider").mouseleave(function () {
                                $(".opacitySlider").remove();
                            });

                            $(".opacityClose").click(function () {
                                $(".opacitySlider").remove();
                            });
                            $('#slider').change(function (event) {
                                //get the value of the slider with this call
                                var o = ($('#slider')[0].value) / 100;
                                console.log("o: " + o);
                                $("#opacityValue").html("Opacity: " + o)
                                map.getLayer(options.id).setOpacity(o);

                                if (wimOptions.otherLayersToggled) {
                                    $.each(wimOptions.otherLayersToggled, function (key, value) {
                                        var lyr = map.getLayer(value);
                                        lyr.setOpacity(o);
                                    });
                                }
                                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                //var e = '#' + $(this).attr('data-wjs-element');
                                //$(e).css('opacity', o)
                            });

                        });
                    }
                } else {
                    $('#' + groupDivID).append(button);
                    if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                        var id = "#info" + camelize(layerName);
                        var moreinfo = $(id);
                        moreinfo.click(function(e) {
                            window.open(wimOptions.moreinfo, "_blank");
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    }
                    if ($("#opacity"+camelize(layerName)).length > 0) {
                        $("#opacity"+camelize(layerName)).click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(".opacitySlider").remove();
                            var currOpacity = map.getLayer(options.id).opacity;
                            var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                            $("body").append(slider);[0]

                            $("#slider")[0].value = currOpacity*100;
                            $(".opacitySlider").css('left', event.clientX-180);
                            $(".opacitySlider").css('top', event.clientY-50);

                            $(".opacitySlider").mouseleave(function() {
                                $(".opacitySlider").remove();
                            });

                            $(".opacityClose").click(function() {
                                $(".opacitySlider").remove();
                            });
                            $('#slider').change(function(event) {
                                //get the value of the slider with this call
                                var o = ($('#slider')[0].value)/100;
                                console.log("o: " + o);
                                $("#opacityValue").html("Opacity: " + o)
                                map.getLayer(options.id).setOpacity(o);

                                if (wimOptions.otherLayersToggled) {
                                    $.each(wimOptions.otherLayersToggled, function (key, value) {
                                        var lyr = map.getLayer(value);
                                        lyr.setOpacity(o);
                                    });
                                }
                                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                //var e = '#' + $(this).attr('data-wjs-element');
                                //$(e).css('opacity', o)
                            });
                        });
                    }
                }
            }

            else {
                //otherwise append
                $('#toggle').append(button);
                if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                    var id = "#info" + camelize(layerName);
                    var moreinfo = $(id);
                    moreinfo.click(function(e) {
                        alert(e.currentTarget.id);
                        e.preventDefault();
                        e.stopPropagation();
                    });
                }
            }
        }


        //get visible and non visible layer lists
        /*function addMapServerLegend(layerName, layerDetails) {


            if (layerDetails.wimOptions.layerType === 'agisFeature') {

                //for feature layer since default icon is used, put that in legend
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="https://raw.githubusercontent.com/Leaflet/Leaflet/master/dist/images/marker-icon.png" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisWMS') {

                //for WMS layers, for now just add layer title
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="http://placehold.it/25x41" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisDynamic') {

                //create new legend div
                var legendItemDiv = $('<div align="left" id="' + camelize(layerName) + '"><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItemDiv);

                //get legend REST endpoint for swatch
                $.getJSON(layerDetails.url + '/legend?f=json', function (legendResponse) {

                    console.log(layerName,'legendResponse',legendResponse);



                    //make list of layers for legend
                    if (layerDetails.options.layers) {
                        //console.log(layerName, 'has visisble layers property')
                        //if there is a layers option included, use that
                        var visibleLayers = layerDetails.options.layers;
                    }
                    else {
                        //console.log(layerName, 'no visible layers property',  legendResponse)

                        //create visibleLayers array with everything
                        var visibleLayers = [];
                        $.grep(legendResponse.layers, function(i,v) {
                            visibleLayers.push(v);
                        });
                    }

                    //loop over all map service layers
                    $.each(legendResponse.layers, function (i, legendLayer) {

                        //var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong>');
                        //$('#' + camelize(layerName)).append(legendHeader);

                        //sub-loop over visible layers property
                        $.each(visibleLayers, function (i, visibleLayer) {

                            //console.log(layerName, 'visibleLayer',  visibleLayer);

                            if (visibleLayer == legendLayer.layerId) {

                                console.log(layerName, visibleLayer,legendLayer.layerId, legendLayer)

                                //console.log($('#' + camelize(layerName)).find('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>'))

                                var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>');
                                $('#' + camelize(layerName)).append(legendHeader);

                                //get legend object
                                var feature = legendLayer.legend;
                                /*
                                 //build legend html for categorized feautres
                                 if (feature.length > 1) {
                                 */

                                //placeholder icon
                                //<img alt="Legend Swatch" src="http://placehold.it/25x41" />

                                /*$.each(feature, function () {

                                    //make sure there is a legend swatch
                                    if (this.imageData) {
                                        var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + this.imageData + '" /><small>' + this.label.replace('<', '').replace('>', '') + '</small></br>');

                                        $('#' + camelize(layerName)).append(legendFeature);
                                    }
                                });
                                /*
                                 }
                                 //single features
                                 else {
                                 var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + feature[0].imageData + '" /><small>&nbsp;&nbsp;' + legendLayer.layerName + '</small></br>');

                                 //$('#legendDiv').append(legendItem);
                                 $('#' + camelize(layerName)).append(legendFeature);

                                 }
                                 */
                            /*}
                        }); //each visible layer
                    }); //each legend item
                }); //get legend json
            }
        }*/
        /* parse layers.js */

        //var outSR = new SpatialReference(26917);
        /*measurement.on("measure-end", function(evt){
            //$("#utmCoords").remove();//
            //var resultGeom = evt.geometry;
            //var utmResult;
            //var absoluteX = (evt.geometry.x)*-1;
            /*if ( absoluteX < 84 && absoluteX > 78 ){
                geomService.project ( [ resultGeom ], outSR, function (projectedGeoms){
                    utmResult = projectedGeoms[0];
                    console.log(utmResult);
                    var utmX = utmResult.x.toFixed(0);
                    var utmY = utmResult.y.toFixed(0);
                    $("#utmX").html(utmX);
                    $("#utmY").html(utmY);
                    //var utmCoords = $('<tr id="utmCoords"><td dojoattachpoint="pinCell"><span>UTM17</span></td> <td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">' + utmX + '</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">' + utmY + '</span></td></tr>');
                    //$('.esriMeasurementResultTable').append(utmCoords);
                });

            } else {
                //$("#utmX").html("out of zone");
                $("#utmX").html('<span class="label label-danger">outside zone</span>');
                //$("#utmY").html("out of zone");
                $("#utmY").html('<span class="label label-danger">outside zone</span>');
            }*/


            //geomService.project ( [ resultGeom ], outSR, function (projectedGeoms){
                //utmResult = projectedGeoms[0];
                //console.log(utmResult);
            //});

        //});//

    });//end of require statement containing legend building code

});

function stateSelected() {
    var select = $('#stateSelect')[0];
    if (select.selectedIndex > 0) {
        var selectedVal = select.options[select.selectedIndex].value;
        var selectedState = select.options[select.selectedIndex].label;
        $('#downloadState').html("Download <a target='_blank' href='ftp://128.104.224.198/State-Downloads/" + selectedVal + "_geodatabase_wetlands.zip' onclick='ga(\"send\", \"event\", \"Downloads\", \"Digital Data\", \"" + selectedVal + " Geodatabase\");'>Geodatabase</a> and " +
        "<a target='_blank' href='ftp://128.104.224.198/State-Downloads/" + selectedVal + "_shapefile_wetlands.zip' onclick='ga(\"send\", \"event\", \"Downloads\", \"Digital Data\", \"" + selectedVal + " Shapefile\");'>Shapefile</a> data for <b>" + selectedState + "</b>");
    } else {
        $('#downloadState').html("");
    }
}

$(".close-alert").click(function(){
    $(this).parent().slideUp(250);
});

function hucLinkListener(HUCNumber) {
    console.log(HUCNumber);
    $.get("https://fwsprimary.wim.usgs.gov/downloadLoggingService/downloadLog.asmx/Log?huc=" + HUCNumber + ",NWIV2", function(data) {
        //console.log(data);
    });
}

$(document).ready(function () {
    //7 lines below are handler for the legend buttons. to be removed if we stick with the in-map legend toggle
    //$('#legendButtonNavBar, #legendButtonSidebar').on('click', function () {
    //    $('#legend').toggle();
    //    //return false;
    //});
    //$('#legendClose').on('click', function () {
    //    $('#legend').hide();
    //});

});
