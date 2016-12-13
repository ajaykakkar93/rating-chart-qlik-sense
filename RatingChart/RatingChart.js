
define(["jquery", "./prop", "text!./style.css"], 
function($, properties, cssContent) {
	'use strict';
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties : {
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 4,
					qHeight : 100
				}]
			}
		},
		definition : properties,
		snapshot : {
			canTakeSnapshot : true
		},
		paint : function($element, layout) {

			var self = this, html = "", measures = layout.qHyperCube.qMeasureInfo, qData = layout.qHyperCube.qDataPages[0],
			vmax = (measures && measures[0]) ? measures[0].qMax * 1.5 : 1
			, w = $element.width() - 130;
			if(qData && qData.qMatrix) {
				$.each(qData.qMatrix, function(key, row) {
							
					if(row.length > 1) {
							//dimension is first, measure second
						var dim = row[0], meas = row[1];
						
						 html += '<div class="wrap"><div class="box leftdiv">';
             
						  var rate = meas.qNum;
						  var rate1 = "" + rate;
            			  var res = rate1.split('.');
			
			  
						if(dim.qIsOtherCell) {
							dim.qText = layout.qHyperCube.qDimensionInfo[0].othersLabel;
						}
						html += '<div title="' + dim.qText + ':' + meas.qText + '"';
						//total (-1) is not selectable
						if(dim.qElemNumber !== -1) {
							html += "class='selectable' data-value='" + dim.qElemNumber + "'"
						}
						html += '>';
						html += "<div class='label title leftdiv'>" + dim.qText + "</div> <div class='rightdiv'>";
					
						//html += "<div class='bar' style='width:" + Math.round(w * (meas.qNum / vmax )) + "px;'>&nbsp;</div>";
						// html += "<div class='bar' style='width:" + Math.round(w * (meas.qNum / vmax) ) + "px;'>&nbsp;</div>";
						//alert(vmax );
						
							
					
			  
               
			   if (res[0] == 1) {
				
				
                  html += "<div class='bar' style='width:" + Math.round(w * (meas.qNum / vmax) ) + "px;'></div>";
               
			   
                  html += "<span class='star on'>";
               
			   
			    } else if (res[0] == 2) {
                   html +=' <span  class="star on"></span><span class="star on"></span>';
                } else if (res[0] == 3) {
                    html +=' <span class="star on"></span><span class="star on"></span><span class="star on"></span>';
                } else if (res[0] == 4) {
                   html +=' <span class="star on"></span><span class="star on"></span><span class="star on"></span><span class="star on"></span>';
                } else if (res[0] == 5) {
                   html +=' <span class="star on"></span><span class="star on"></span><span class="star on"></span><span class="star on"></span><span class="star on"></span>';
                }
				
					
				
				
			    if (res[1] == 0) {
                        html += '';
                    } 
			    if (res[1] == 1) {
                        html += ' <span class="star one"></span>';
                    } else if (res[1] == 2) {
                        html += ' <span class="star two"></span>';
                    } else if (res[1] == 3) {
                        html += ' <span class="star three"></span>';
                    } else if (res[1] == 4) {
                        html += '<span class="star four"></span>';
                    } else if (res[1] == 5) {
                        html += ' <span class="star five"></span>';
                    } else if (res[1] == 6) {
                        html += ' <span class="star six"></span>';
                    } else if (res[1] == 7) {
                        html += ' <span class="star seven"></span>';
                    } else if (res[1] == 8) {
                        html += ' <span class="star eight"></span>';
                    } else if (res[1] == 9) {
                        html += ' <span class="star nine"></span>';
                    }
				
					

						
						html += "</div></div></div></div>";
						
						
						
						
					}
					
					
					
					
				});
				$element.html(html);
				$element.find('.selectable').on('qv-activate', function() {
					if(this.hasAttribute("data-value")) {
						var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
						self.selectValues(dim, [value], true);
						$(this).toggleClass("selected");
					}
				});
			}
		}
	};
});
