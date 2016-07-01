function addCommas(e){e+="";for(var a=e.split("."),i=a[0],t=a.length>1?"."+a[1]:"",s=/(\d+)(\d{3})/;s.test(i);)i=i.replace(s,"$1,$2");return i+t}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0===a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}function stateSelected(){var e=$("#stateSelect")[0];if(e.selectedIndex>0){var a=e.options[e.selectedIndex].value,i=e.options[e.selectedIndex].label;$("#downloadState").html("Download <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_wetlands.zip'>Geodatabase</a> and <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_shapefile_wetlands.zip'>Shapefile</a> data for <b>"+i+"</b>")}else $("#downloadState").html("")}var allLayers,renderer;require(["esri/InfoTemplate","esri/renderers/UniqueValueRenderer","esri/symbols/PictureMarkerSymbol","dojo/domReady!"],function(e,a,i){var t=new i("../images/grn-pushpin.png",45,45);renderer=new a(t);var s=new e("${NAME}","Type: ${TYPE}<br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");allLayers=[{groupHeading:"ESRI dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{Wetlands:{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Wetlands/MapServer",options:{id:"wetlands",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0,moreinfo:"http://www.fws.gov/wetlands/Data/Wetlands-V2-Product-Summary.html",otherLayersToggled:["wetlandsStatus","wetlandsRaster"]}},"Wetlands Status":{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Wetlands_Status/MapServer",options:{id:"wetlandsStatus",layers:[1],visible:!0,maxScale:285e3,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,includeLegend:!0,layerDefinitions:{0:"STATUS = 'Digital' OR STATUS = 'No_Data'"}}},"Wetlands ":{url:"https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Wetlands_Raster/ImageServer",options:{id:"wetlandsRaster",visible:!0,maxScale:285e3,opacity:.6},wimOptions:{type:"layer",layerType:"agisImage",includeInLayerList:!1,includeLegend:!0}},Riparian:{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Riparian/MapServer",visibleLayers:[0],options:{id:"riparian",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html",includeLegend:!0}},"Riparian Mapping Areas":{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Riparian/MapServer",visibleLayers:[1],options:{id:"riparianStatus",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html",includeLegend:!0}},HUC8:{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/HUCs/MapServer",options:{id:"huc8",opacity:1,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1}}}},{groupHeading:"Data Source Group",showGroupHeading:!1,includeInLayerList:!0,moreinfo:"https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf",otherLayersToggled:["sourceType","imageScale","imageYear"],layers:{"Source Type":{url:"https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Data_Source/MapServer",visibleLayers:[1],options:{id:"sourceType",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0,moreinfo:"https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf",otherLayersToggled:["imageScale","imageYear"]}},"Image Scale":{url:"https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Data_Source/MapServer",visibleLayers:[2],options:{id:"imageScale",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0,otherLayersToggled:["sourceType","imageYear"]}},"Image Year":{url:"https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Data_Source/MapServer",visibleLayers:[3],options:{id:"imageYear",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0,otherLayersToggled:["sourceType","imageScale"]}}}},{groupHeading:"refuges and historic",showGroupHeading:!1,includeInLayerList:!0,layers:{"Areas of Interest":{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Areas_of_Interest/MapServer/0",options:{id:"aoi",opacity:1,visible:!1,outFields:["*"],infoTemplate:s},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!1,moreinfo:"https://www.fws.gov/wetlands/Data/metadata/FWS_Wetland_Areas_of_Interest.xml",includeLegend:!0,renderer:renderer}},"FWS Refuges":{url:"https://gis.fws.gov/ArcGIS/rest/services/FWS_Refuge_Boundaries/MapServer",visibleLayers:[0,1,3],options:{id:"fwsRefuges",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/gis/data/CadastralDB/index_cadastral.html",includeLegend:!0}},"Historic Wetland Data":{url:"https://fwsmapservices.wim.usgs.gov/ArcGIS/rest/services/Historic_Wetlands/MapServer",visibleLayers:[0,1],options:{id:"historic",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Data/Historic-Wetlands-Product-Summary.html",includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],measurement,identifyTask,identifyParams;require(["esri/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/layers/ArcGISTiledMapServiceLayer","esri/renderers/UniqueValueRenderer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,a,i,t,s,n,o,r,l,p,c,d,m,g,y,u,f,v,h,b,w,L,S,T,I,x,k,D,O,P,M){function W(){$("#printModal").modal("show")}function A(){$("#getDataModal").modal("show")}function C(){Y.activeGeocoder.searchExtent=null}function E(){C();var e=Y.find();e.then(function(e){_(e)}),$("#geosearchModal").modal("hide")}function G(e){R();var a=e.graphic?e.graphic:e.result.feature;a.setSymbol(X)}function _(e){if(e=e.results,e.length>0){R();for(var a=0;a<e.length;a++);if(null!=e[0].extent)map.setExtent(e[0].extent,!0);else{var i=new m(e[0].feature.geometry);map.centerAndZoom(i,17)}}}function R(){map.infoWindow.hide(),map.graphics.clear()}function N(e,a,i,t,s){return new f({angle:0,xoffset:a,yoffset:i,type:"esriPMS",url:e,contentType:"image/png",width:t,height:s})}function H(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+r+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var i=new S;i.map=map;var t=new T;t.exportOptions={width:500,height:400,dpi:300},t.format="PDF",t.layout="Letter ANSI A Landscape test",t.preserveScale=!1;var s=new w;s.layerId="wetlands";var n=new w;n.layerId="wetlandsRaster";var o=$("#printTitle").val();""==o?t.layoutOptions={titleText:"Wetlands",authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[s,n]}:t.layoutOptions={titleText:o,authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[s,n]};var r=t.layoutOptions.titleText;i.template=t;var l=new L("https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");l.execute(i,e,a),$.get("https://fwsmapservices.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo="+map.getScale()+","+map.extent.xmin+","+map.extent.ymax+","+map.extent.xmax+","+map.extent.ymin+",NWIV2",function(e){})}function z(e,a){var i;document.getElementById&&(i=document.getElementById(e))&&i.style&&(i.style.cursor=a)}esri.config.defaults.io.proxyUrl="https://fwsmapservices.wim.usgs.gov/serviceProxy/proxy.ashx",i.defaults.geometryService=new v("https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"hybrid",extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new u({wkid:3857}))});var j=new s({map:map,extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new u({wkid:3857}))},"homeButton");j.startup();var q=new o({map:map,scale:4514},"locateButton");q.startup(),measurement=new r({map:map,advancedLocationUnits:!0},k.byId("measurementDiv")),measurement.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){W()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),H()}),$("#getDataButton").click(function(){A()}),M(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=I.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}),M(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),M(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var a=I.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}}),M(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=I.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var F=new g("https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"),U=new g("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");M(k.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(U),map.removeLayer(F)}),M(k.byId("btnNatlMap"),"click",function(){map.addLayer(U,1),map.removeLayer(F)}),M(k.byId("btnUsgsTopo"),"click",function(){map.addLayer(F,1),map.removeLayer(U)}),identifyParams=new h,identifyParams.tolerance=0,identifyParams.returnGeometry=!0,identifyParams.layerOption=h.LAYER_OPTION_ALL,identifyParams.width=map.width,identifyParams.height=map.height,identifyTask=new b(allLayers[0].layers.Wetlands.url);var B=P(".title",map.infoWindow.domNode)[0],V=new O(map.infoWindow.domNode,{handle:B});M(V,"FirstMove",function(){var e=P(".outerPointer",map.infoWindow.domNode)[0];D.add(e,"hidden");var e=P(".pointer",map.infoWindow.domNode)[0];D.add(e,"hidden")}.bind(this)),M(map,"click",function(e){if(null==measurement.activeTool&&(map.graphics.clear(),identifyParams.geometry=e.mapPoint,identifyParams.mapExtent=map.extent,map.getLevel()>=12)){identifyTask=new b(allLayers[0].layers.Wetlands.url);var a=identifyTask.execute(identifyParams);z("mainDiv","wait"),map.setCursor("wait"),a.addCallback(function(a){if(a.length>1){for(var i,t,s,n=0;n<a.length;n++)0==a[n].layerId?(i=a[n].feature,t=i.attributes):1==a[n].layerId&&(s=a[n].feature.attributes);var o=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));i.geometry.spatialReference=map.spatialReference;var r=i;r.setSymbol(o),map.graphics.add(r);var l="";l="None"==s.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+s.SUPPMAPINFO+"'>click here</a>",("<Null>"==s.IMAGE_DATE||"0"==s.IMAGE_DATE||0==s.IMAGE_DATE)&&(s.IMAGE_DATE=l);var p=new esri.InfoTemplate("Wetland","<b>Classification:</b> "+t.ATTRIBUTE+" (<a target='_blank' href='https://fwsmapservices.wim.usgs.gov/decoders/SWI.aspx?CodeURL="+t.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+t.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(t.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+s.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");i.setInfoTemplate(p),map.infoWindow.setFeatures([i]),map.infoWindow.show(e.mapPoint,map.getInfoWindowAnchor(e.screenPoint));var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});z("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=I.webMercatorToGeographic(i.geometry),t=a.getExtent();map.setExtent(t,!0)})}else if(a.length<=1){identifyTask=new b(allLayers[0].layers.Riparian.url);var d=identifyTask.execute(identifyParams);d.addCallback(function(a){if(a.length>1){for(var i,t,s,n=0;n<a.length;n++)0==a[n].layerId?(i=a[n].feature,t=i.attributes):1==a[n].layerId&&(s=a[n].feature.attributes);var o=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));i.geometry.spatialReference=map.spatialReference;var r=i;r.setSymbol(o),map.graphics.add(r);var l="";l="None"==s.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+s.SUPPMAPINFO+"'>click here</a>";var p=new esri.InfoTemplate("Riparian","<b>Classification:</b> "+t.ATTRIBUTE+" (<a target='_blank' href='https://fwsmapservices.wim.usgs.gov/decoders/riparian.aspx?CodeURL="+t.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+t.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(t.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+s.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");i.setInfoTemplate(p),map.infoWindow.setFeatures([i]),map.infoWindow.show(e.mapPoint);var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});z("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=I.webMercatorToGeographic(i.geometry),t=a.getExtent();map.setExtent(t,!0)})}else z("mainDiv","default"),map.setCursor("default"),map.infoWindow.hide()})}})}}),$(document).on("click","#showHUCs",function(){event.preventDefault(),$("#getDataModal").modal("hide"),$("#huc-download-alert").slideDown(250),map.getLayer("huc8").setVisibility(!0)});var Y=new t({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");Y.startup(),Y.on("select",G),Y.on("findResults",_),Y.on("clear",R),M(Y.inputNode,"keydown",function(e){13==e.keyCode&&C()});var X=N("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),M(k.byId("btnGeosearch"),"click",E),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new n({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","esri/tasks/GeometryService","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,a,i,t,s,n,o,r,l,p,c,d,m,g,y,u,f,v,h,b){function w(e,a,i,t,s,n,o){if(map.addLayer(i),L.push([s,camelize(t),i]),s){if(!$("#"+camelize(s)).length){var r;if("Data Source"==s)var r=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+'<span id="info'+camelize(s)+'" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(s)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');else var r=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(L,function(e,a){var i=map.getLayer(a[2].id);if(a[0]==s)if($("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else if(r.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",a[1]);var i=map.getLayer(a[2].id);i.setVisibility(!1)}})});var l=$('<div id="'+camelize(s)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(l)}if(i.visible)var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");else var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");$("#"+camelize(s)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var a=$(this)[0].id;$.each(L,function(e,i){if(i[0]==s)if(i[1]==a&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var t=map.getLayer(i[2].id);t.setVisibility(!0)}else if(i[1]==a&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",i[1]);var t=map.getLayer(i[2].id);t.setVisibility(!1),$("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+i[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(o.includeInLayerList){if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(t)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(!i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(t)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible||void 0===o.hasOpacitySlider||1!=o.hasOpacitySlider)if(i.visible&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!i.visible&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),i.visible?i.setVisibility(!1):i.setVisibility(!0),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,a){var t=map.getLayer(a);t.setVisibility(i.visible)})})}if(void 0!==a){var c=camelize(e);if(!$("#"+c).length){if(a)var d=$('<div id="'+c+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");else var d=$('<div id="'+c+'"></div>');$("#toggle").append(d)}if(s){if($("#"+c).append(r),$("#"+c).append(l),void 0!==o.moreinfo&&o.moreinfo){var m="#info"+camelize(s),g=$(m);g.click(function(e){window.open(o.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}if($("#opacity"+camelize(s)).length>0){var m="#opacity"+camelize(s),y=$(m);y.click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var a=map.getLayer(n.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(n.id).setOpacity(a),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setOpacity(a)})})})}}else{if($("#"+c).append(p),void 0!==o.moreinfo&&o.moreinfo){var m="#info"+camelize(t),g=$(m);g.click(function(e){window.open(o.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(t)).length>0&&$("#opacity"+camelize(t)).click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var a=map.getLayer(n.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(n.id).setOpacity(a),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setOpacity(a)})})})}}else if($("#toggle").append(p),void 0!==o.moreinfo&&o.moreinfo){var m="#info"+camelize(t),g=$(m);g.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var L=(new d("https://fwsmapservices.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),[]);$.each(allLayers,function(e,a){console.log("processing: ",a.groupHeading),$.each(a.layers,function(e,i){var t="";if(i.wimOptions.exclusiveGroupName&&(t=i.wimOptions.exclusiveGroupName),"agisFeature"===i.wimOptions.layerType){var s=new l(i.url,i.options);void 0!==i.wimOptions.renderer&&s.setRenderer(i.wimOptions.renderer),i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:s,title:e}),w(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}else if("agisWMS"===i.wimOptions.layerType){var s=new p(i.url,{resourceInfo:i.options.resourceInfo,visibleLayers:i.options.visibleLayers},i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:s,title:e}),w(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}else if("agisDynamic"===i.wimOptions.layerType){var s=new o(i.url,i.options);if(i.visibleLayers&&s.setVisibleLayers(i.visibleLayers),i.wimOptions&&i.wimOptions.layerDefinitions){var n=[];$.each(i.wimOptions.layerDefinitions,function(e,a){n[e]=a}),s.setLayerDefinitions(n)}i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:s,title:e}),w(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}else if("agisImage"===i.wimOptions.layerType){var s=new r(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:s,title:e}),i.visibleLayers&&s.setVisibleLayers(i.visibleLayers),w(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}})})})}),$(".close-alert").click(function(){$(this).parent().slideUp(250)}),$(document).ready(function(){});