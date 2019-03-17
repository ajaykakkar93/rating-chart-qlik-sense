define(["qlik", "jquery", "css!./style.css"], function(qlik, $) {
	function Rating() {
		//<div class="jstars" data-value="4.5"></div>
		$.fn.jstars = function(options) {
			options = options || {};
			var defaults = {
				size: '1.5rem',
				value: 0,
				stars: 5,
				color: '#4285F4',
				emptyColor: '#dddddd'
			};
			var settings = $.extend(defaults, options);
			var unselectable = function($element) {
				$element.css('user-select', 'none').css('-moz-user-select', 'none').css('-khtml-user-select', 'none').css('-webkit-user-select', 'none').css('-o-user-select', 'none');
			}
			var repeat = function(str, total) {
				var final = '';
				for (var i = 0; i < total; i++) final += str;
				return final;
			}
			this.each(function() {
				var $container = $(this);
				var value = $container.data('value') || settings.value;
				var totalStars = $container.data('total-stars') || settings.stars;
				var color = $container.data('color') || settings.color;
				var emptyColor = $container.data('empty-color') || settings.emptyColor;
				var size = $container.data('size') || settings.size;
				var $emptyStars = $(document.createElement('div')).addClass('jstars-empty').css('position', 'relative').css('display', 'inline-block').css('font-size', size).css('line-height', size).css('color', emptyColor).append(repeat("&starf;", totalStars));
				unselectable($emptyStars);
				var $filledStars = $(document.createElement('div')).addClass('jstars-filled').css('top', 0).css('left', 0).css('position', 'absolute').css('display', 'inline-block').css('font-size', size).css('line-height', size).css('width', ((value / totalStars) * 100) + '%').css('overflow', 'hidden').css('white-space', 'nowrap').css('color', color).append(repeat("&starf;", totalStars));
				unselectable($filledStars);
				$emptyStars.append($filledStars);
				$container.append($emptyStars);
			});
			return this;
		}
		$(document.body).ready(function() {
			$('.jstars').jstars();
		});
	}
	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 1000
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					max: 1
				},
				measures: {
					uses: "measures",
					max: 1
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings",
					items: {
						RatingSettings: {
							type: "items",
							label: "Rating Settings",
							items: {
								bgcolor: {
									ref: "bgcolor",
									label: "Background Color",
									type: "string",
									defaultValue: "#22D118"
								},
								textcolor: {
									ref: "textcolor",
									label: "Text Color",
									type: "string",
									defaultValue: "#22D118"
								},
								enableSelection: {
									type: "boolean",
									label: "Enable Selection",
									ref: "enableSelection",
									defaultValue: true
								},
								totalstars: {
									ref: "totalstars",
									label: "Total Stars",
									type: "string",
									defaultValue: "5"
								},
								color: {
									ref: "color",
									label: "Color",
									type: "string",
									defaultValue: "#22D118"
								},
								starbgcolor: {
									ref: "starbgcolor",
									label: "Star Background Color",
									type: "string",
									defaultValue: "#cccccc"
								},
								size: {
									type: "number",
									component: "slider",
									label: "Star Size",
									ref: "size",
									min: 5,
									max: 100,
									step: 5,
									defaultValue: 10
								}
								//end
							}
						}
					}
				}
			}
		},
		support: {
			snapshot: true,
			export: true,
			exportData: false
		},
		paint: function($element, layout) {
			console.log(layout);
			var html = '',
				self = this,
				options = {
					"bgcolor": layout.bgcolor,
					"textcolor": layout.textcolor,
					"enableSelection": layout.enableSelection,
					"totalstars": layout.totalstars,
					"color": layout.color,
					"starbgcolor": layout.starbgcolor,
					"size": layout.size
				};
			layout.qHyperCube.qDataPages[0].qMatrix.map(function(v) {
				console.log(v[0].qText, v[1].qText, v[1].qNum);
				html += '<span style="color:' + options.textcolor + ';">' + v[0].qText + '</span>' + '<div title="' + v[1].qText + '" class="jstars" data-select="' + v[0].qElemNumber + '" data-value="' + v[1].qNum + '" data-total-stars="' + options.totalstars + '" data-color="' + options.color + '" data-empty-color="' + options.starbgcolor + '" data-size="' + options.size + 'px"></div>';
			});
			$element.html(html);
			$element.css({
				"background": options.bgcolor,
				"padding": "5px 5px 5px 5px",
				"overflow": "auto"
			});
			Rating();
			if (options.enableSelection) {
				$element.find('.jstars').on('qv-activate', function() {
					if (this.hasAttribute("data-value")) {
						var value = parseInt(this.getAttribute("data-select"), 10),
							dim = 0;
						self.selectValues(dim, [value], true);
						$(this).toggleClass("selected");
					}
				});
			}
			//needed for export
			return qlik.Promise.resolve();
		}
	};
});