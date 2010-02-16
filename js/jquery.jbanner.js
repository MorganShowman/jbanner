/* 

	jBanner  - a jQuery Banner Plugin
	
	Copyright (c) 2009 Morgan Showman
	
	Dual licensed under the MIT and GPL licenses:
	http://www.opensource.org/licenses/mit-license.php
	http://www.gnu.org/licenses/gpl.html
	
*/

(function($) {

	//define jBanner object with some default config settings
	$.jBanner = {
		defaults: {
			bannerContainer: "",
			height: 295,			// height of images
			width: 685, 			// width of images
			borderSize: '0',			// size of border around images
			borderStyle: 'none',	// style of border around images
			borderColor: 'F00',		// color of border around images
			padding: 0, 			// amount of padding (in pixels) around images
			margin: 0, 				// amount of margin (in pixels) around images
			caption: false,			// display caption? true or false
			cheight: 0, 			// caption height
			delay: 5000, 			// delay to next element
			speed: 1000 			// transition speed
		}
	};
	
	//extend jquery with the plugin
	$.fn.extend({
		jBanner:function(options) {
			
			//use defaults or properties supplied by user
			var config = $.extend({}, $.jBanner.defaults, options);

			if (!config.caption){config.cheight=0;}

			config.bannerContainer = "#"+this.attr("id");

			banner(config);

			//return the jquery object for chaining
			return this;
		}
	});
	function banner(config) {
		$(config.bannerContainer).css({'position':'relative','height':config.height+config.cheight+config.padding*2+config.margin*2+parseInt(config.borderSize)*2+'px','width':config.width+parseInt(config.borderSize)*2+'px','overflow':'hidden'});
		$(config.bannerContainer+" li").each(function(i){$(this).css({'position':'absolute','top':'0','left':i*(config.width+config.padding*2+config.margin*2+parseInt(config.borderSize)*2)+'px'});$(this).attr("title",i+1);$(this).children("a").after("<p>"+$(this).children("a").children("img").attr("alt")+"</p>");});
		$(config.bannerContainer+" li:first").addClass("selected");
		$(config.bannerContainer+" li img").css({'border':config.borderSize+'px '+config.borderStyle+' #'+config.borderColor,'height':config.height,'width':config.width});
		setTimeout( function(){next(config)}, config.delay);
	};
	function next(config) {
		var i = parseInt($(config.bannerContainer+" li.selected").attr("title"));
		if (LastElement(config,i)){$(config.bannerContainer+" li[title='"+NextElement(config,i)+"']").css('left',(config.width+config.padding*2+config.margin*2+parseInt(config.borderSize)*2)+'px');}
		$(config.bannerContainer+" li[title='"+i+"']").removeClass("selected");
		$(config.bannerContainer+" li[title='"+(NextElement(config,i))+"']").addClass("selected");
		$(config.bannerContainer+" li").each(function(i){var newLeft = parseInt( $(this).css("left").replace(/px/i, '') )-(config.width+config.padding*2+config.margin*2+parseInt(config.borderSize)*2);$(this).animate({'left':newLeft+'px'},config.speed+250);});
		setTimeout( function(){next(config)}, config.delay);
	};
	function NextElement(config,index) {
		if(index < parseInt($(config.bannerContainer+" li:last").attr("title"))) {return index + 1;} else {return 1;}
	};
	function LastElement(config,index) {
		return (parseInt($(config.bannerContainer+" li[title='"+NextElement(config,index)+"']").css("left").replace(/px/i, '')) == (1 - parseInt($(config.bannerContainer+" li:last").attr("title")))*(config.width+config.padding*2+config.margin*2+parseInt(config.borderSize)*2));
	};
})(jQuery);