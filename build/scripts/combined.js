function addCommas(e){e+="";for(var a=e.split("."),i=a[0],t=a.length>1?"."+a[1]:"",n=/(\d+)(\d{3})/;n.test(i);)i=i.replace(n,"$1,$2");return i+t}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0===a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}function stateSelected(){var e=$("#stateSelect")[0];if(e.selectedIndex>0){var a=e.options[e.selectedIndex].value,i=e.options[e.selectedIndex].label;$("#downloadState").html("Download <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_wetlands.zip'>Geodatabase</a> and <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_shapefile_wetlands.zip'>Shapefile</a> data for <b>"+i+"</b>")}else $("#downloadState").html("")}var allLayers;require(["dojo/domReady!"],function(){allLayers=[{groupHeading:"ESRI dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{Wetlands:{url:"http://107.20.228.18/ArcGIS/rest/services/swi/SWI/MapServer",options:{id:"wetlands",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0,moreinfo:"http://www.fws.gov/wetlands/Data/Wetlands-Product-Summary.html",otherLayersToggled:["wetlandsStatus","wetlandsRaster"]}},"Wetlands Status":{url:"http://107.20.228.18/ArcGIS/rest/services/swi/SWI_Status/MapServer",options:{id:"wetlandsStatus",layers:[1],visible:!0,maxScale:285e3,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,includeLegend:!0,layerDefinitions:{0:"STATUS = 'Digital' OR STATUS = 'No_Data'"}}},"Wetlands Raster":{url:"http://52.70.106.103/arcgis/rest/services/swi/WetlandsRaster_V2/ImageServer",options:{id:"wetlandsRaster",visible:!0,maxScale:285e3,opacity:.6},wimOptions:{type:"layer",layerType:"agisImage",includeInLayerList:!1,includeLegend:!0}},Riparian:{url:"http://52.70.106.103/ArcGIS/rest/services/Riparian/MapServer",visibleLayers:[0],options:{id:"riparian",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html",includeLegend:!0}},"Riparian Mapping Areas":{url:"http://52.70.106.103/ArcGIS/rest/services/Riparian/MapServer",visibleLayers:[1],options:{id:"riparianStatus",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0}},HUC8:{url:"http://52.70.106.103:6080/ArcGIS/rest/services/HUCs/MapServer",options:{id:"huc8",opacity:1,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1}}}},{groupHeading:"Data Source Group",showGroupHeading:!1,includeInLayerList:!0,layers:{"Source Type":{url:"http://107.20.228.18/ArcGIS/rest/services/swi/Data_Source/MapServer",visibleLayers:[1],options:{id:"sourceType",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0}},"Image Scale":{url:"http://107.20.228.18/ArcGIS/rest/services/swi/Data_Source/MapServer",visibleLayers:[2],options:{id:"imageScale",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0}},"Image Year":{url:"http://107.20.228.18/ArcGIS/rest/services/swi/Data_Source/MapServer",visibleLayers:[3],options:{id:"imageYear",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0}}}},{groupHeading:"refuges and historic",showGroupHeading:!1,includeInLayerList:!0,layers:{"FWS Refuges":{url:"http://gis.fws.gov/ArcGIS/rest/services/FWS_Refuge_Boundaries/MapServer",visibleLayers:[0,1,3],options:{id:"fwsRefuges",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/gis/data/CadastralDB/FwsInterest.html",includeLegend:!0}},"Historic Wetland Data":{url:"http://52.70.106.103/ArcGIS/rest/services/Historic_Wetlands/MapServer",visibleLayers:[0,1],options:{id:"historic",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Data/Historic-Wetlands-Product-Summary.html",includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],identifyTask,identifyParams;require(["esri/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/layers/ArcGISTiledMapServiceLayer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,a,i,t,n,s,o,r,l,p,c,d,y,m,g,u,f,h,v,b,w,L,S,T,I,x,k,O,D,P){function C(){$("#printModal").modal("show")}function W(){$("#getDataModal").modal("show")}function M(){Y.activeGeocoder.searchExtent=null}function G(){M();var e=Y.find();e.then(function(e){E(e)}),$("#geosearchModal").modal("hide")}function A(e){H();var a=e.graphic?e.graphic:e.result.feature;a.setSymbol(Z)}function E(e){if(e=e.results,e.length>0){H();for(var a=0;a<e.length;a++);var i=new y(e[0].feature.geometry);map.centerAndZoom(i,17)}}function H(){map.infoWindow.hide(),map.graphics.clear()}function N(e,a,i,t,n){return new u({angle:0,xoffset:a,yoffset:i,type:"esriPMS",url:e,contentType:"image/png",width:t,height:n})}function R(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+r+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var i=new L;i.map=map;var t=new S;t.exportOptions={width:500,height:400,dpi:300},t.format="PDF",t.layout="Letter ANSI A Landscape test",t.preserveScale=!1;var n=new b;n.layerId="wetlands";var s=new b;s.layerId="wetlandsRaster";var o=$("#printTitle").val();""==o?t.layoutOptions={titleText:"Wetlands",authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[n,s]}:t.layoutOptions={titleText:o,authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[n,s]};var r=t.layoutOptions.titleText;i.template=t;var l=new w("http://107.20.228.18/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");l.execute(i,e,a)}function j(e,a){var i;document.getElementById&&(i=document.getElementById(e))&&i.style&&(i.style.cursor=a)}esri.config.defaults.io.proxyUrl="http://52.70.106.103/serviceProxy/proxy.ashx",i.defaults.geometryService=new f("http://52.70.106.103/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"hybrid",extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new g({wkid:3857}))});var z=new n({map:map,extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new g({wkid:3857}))},"homeButton");z.startup();var _=new o({map:map,scale:4514},"locateButton");_.startup();var B=new r({map:map,advancedLocationUnits:!0},x.byId("measurementDiv"));B.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){C()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),R()}),$("#getDataButton").click(function(){W()}),P(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=T.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}),P(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),P(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var a=T.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}}),P(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=T.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var q=new m("http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"),F=new m("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");P(x.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(F),map.removeLayer(q)}),P(x.byId("btnNatlMap"),"click",function(){map.addLayer(F,1),map.removeLayer(q)}),P(x.byId("btnUsgsTopo"),"click",function(){map.addLayer(q,1),map.removeLayer(F)}),identifyParams=new h,identifyParams.tolerance=0,identifyParams.returnGeometry=!0,identifyParams.layerOption=h.LAYER_OPTION_ALL,identifyParams.width=map.width,identifyParams.height=map.height,identifyTask=new v(allLayers[0].layers.Wetlands.url);var U=D(".title",map.infoWindow.domNode)[0],V=new O(map.infoWindow.domNode,{handle:U});P(V,"FirstMove",function(){var e=D(".outerPointer",map.infoWindow.domNode)[0];k.add(e,"hidden");var e=D(".pointer",map.infoWindow.domNode)[0];k.add(e,"hidden")}.bind(this)),P(map,"click",function(e){if(map.graphics.clear(),identifyParams.geometry=e.mapPoint,identifyParams.mapExtent=map.extent,map.getLevel()>=12){identifyTask=new v(allLayers[0].layers.Wetlands.url);var a=identifyTask.execute(identifyParams);j("mainDiv","wait"),map.setCursor("wait"),a.addCallback(function(a){if(a.length>1){for(var i,t,n,s=0;s<a.length;s++)0==a[s].layerId?(i=a[s].feature,t=i.attributes):1==a[s].layerId&&(n=a[s].feature.attributes);var o=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));i.geometry.spatialReference=map.spatialReference;var r=i;r.setSymbol(o),map.graphics.add(r);var l="";l="None"==n.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+n.SUPPMAPINFO+"'>click here</a>";var p=new esri.InfoTemplate("Wetland","<b>Classification:</b> "+t.ATTRIBUTE+" (<a target='_blank' href='http://52.70.106.103/decoders/wetlands.aspx?CodeURL="+t.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+t.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(t.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+n.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");i.setInfoTemplate(p),map.infoWindow.setFeatures([i]),map.infoWindow.show(e.mapPoint,map.getInfoWindowAnchor(e.screenPoint));var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=T.webMercatorToGeographic(i.geometry),t=a.getExtent();map.setExtent(t,!0)})}else if(a.length<=1){identifyTask=new v(allLayers[0].layers.Riparian.url);var d=identifyTask.execute(identifyParams);d.addCallback(function(a){if(a.length>1){for(var i,t,n,s=0;s<a.length;s++)0==a[s].layerId?(i=a[s].feature,t=i.attributes):1==a[s].layerId&&(n=a[s].feature.attributes);var o=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));i.geometry.spatialReference=map.spatialReference;var r=i;r.setSymbol(o),map.graphics.add(r);var l="";l="None"==n.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+n.SUPPMAPINFO+"'>click here</a>";var p=new esri.InfoTemplate("Riparian","<b>Classification:</b> "+t.ATTRIBUTE+" (<a target='_blank' href='http://52.70.106.103/decoders/wetlands.aspx?CodeURL="+t.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+t.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(t.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+n.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");i.setInfoTemplate(p),map.infoWindow.setFeatures([i]),map.infoWindow.show(e.mapPoint);var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=T.webMercatorToGeographic(i.geometry),t=a.getExtent();map.setExtent(t,!0)})}else j("mainDiv","default"),map.setCursor("default"),map.infoWindow.hide()})}})}});var Y=new t({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");Y.startup(),Y.on("select",A),Y.on("findResults",E),Y.on("clear",H),P(Y.inputNode,"keydown",function(e){13==e.keyCode&&M()});var Z=N("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),P(x.byId("btnGeosearch"),"click",G),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new s({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","esri/tasks/GeometryService","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,a,i,t,n,s,o,r,l,p,c,d,y,m,u,f,h,v,b,w){function L(e,a,i,t,n,s,o){if(map.addLayer(i),S.push([n,camelize(t),i]),n){if(!$("#"+camelize(n)).length){var r=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(S,function(e,a){var i=map.getLayer(a[2].id);if(a[0]==n)if($("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else if(r.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",a[1]);var i=map.getLayer(a[2].id);i.setVisibility(!1)}})});var l=$('<div id="'+camelize(n)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(l)}if(i.visible)var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");else var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");$("#"+camelize(n)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var a=$(this)[0].id;$.each(S,function(e,i){if(i[0]==n)if(i[1]==a&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var t=map.getLayer(i[2].id);t.setVisibility(!0)}else if(i[1]==a&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",i[1]);var t=map.getLayer(i[2].id);t.setVisibility(!1),$("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+i[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(o.includeInLayerList){if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"><span id="opacity'+camelize(t)+'" style="padding-left: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"><span id="opacity'+camelize(t)+'" style="padding-left: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible||void 0===o.hasOpacitySlider||1!=o.hasOpacitySlider)if(i.visible&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!i.visible&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),i.visible?i.setVisibility(!1):i.setVisibility(!0),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,a){var t=map.getLayer(a);t.setVisibility(i.visible)})})}if(void 0!==a){var c=camelize(e);if(!$("#"+c).length){if(a)var d=$('<div id="'+c+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");else var d=$('<div id="'+c+'"></div>');$("#toggle").append(d)}if(n)$("#"+c).append(r),$("#"+c).append(l);else{if($("#"+c).append(p),void 0!==o.moreinfo&&o.moreinfo){var y="#info"+camelize(t),m=$(y);m.click(function(e){window.open(o.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(t)).length>0&&$("#opacity"+camelize(t)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(s.id).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(s.id).setOpacity(a),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setOpacity(a)})})})}}else if($("#toggle").append(p),void 0!==o.moreinfo&&o.moreinfo){var y="#info"+camelize(t),m=$(y);m.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var S=(new d("http://52.70.106.103/arcgis/rest/services/Utilities/Geometry/GeometryServer"),[]);$.each(allLayers,function(e,a){console.log("processing: ",a.groupHeading),$.each(a.layers,function(e,i){var t="";if(i.wimOptions.exclusiveGroupName&&(t=i.wimOptions.exclusiveGroupName),"agisFeature"===i.wimOptions.layerType){var n=new l(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),L(a.groupHeading,a.showGroupHeading,n,e,t,i.options,i.wimOptions)}else if("agisWMS"===i.wimOptions.layerType){var n=new p(i.url,{resourceInfo:i.options.resourceInfo,visibleLayers:i.options.visibleLayers},i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),L(a.groupHeading,a.showGroupHeading,n,e,t,i.options,i.wimOptions)}else if("agisDynamic"===i.wimOptions.layerType){var n=new o(i.url,i.options);if(i.visibleLayers&&n.setVisibleLayers(i.visibleLayers),i.wimOptions&&i.wimOptions.layerDefinitions){var s=[];$.each(i.wimOptions.layerDefinitions,function(e,a){s[e]=a}),n.setLayerDefinitions(s)}i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),L(a.groupHeading,a.showGroupHeading,n,e,t,i.options,i.wimOptions)}else if("agisImage"===i.wimOptions.layerType){var n=new r(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),i.visibleLayers&&n.setVisibleLayers(i.visibleLayers),L(a.groupHeading,a.showGroupHeading,n,e,t,i.options,i.wimOptions)}})});new g(26917);B.on("measure-end",function(e){e.geometry,-1*e.geometry.x})})}),$(document).ready(function(){});