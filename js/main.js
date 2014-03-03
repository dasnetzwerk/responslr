/***********************************************************************************
	GLOBALS
***********************************************************************************/
var oGlobals											= {
	sLanguage:						$('html').attr('lang').split('-')[0],
	cacheJQueryObjects:				function() {
		oWindow.$										= $(window);
		oBody.$											= $('body');
		oHeader.$										= $('header');
		oFooter.$										= $('footer');
	},
	init:							function() {
		// Init responslr
		responslr.init();

		// Set live url
		responslr.setLiveUrl('responslr.ch', 'www.responslr.ch');

		// Show gridhelper
		if(responslr.isDev) {
			responslr.grid.showHelper();
		}

		// Add breakpoint events
		responslr.grid.addBreakpointEvents({
			breakpoint: 'small',
			onEnter: function() {
				responslr.log('small enter');
			},
			onLeave: function() {
				responslr.log('small leave');
			}
		}, {
			breakpoint: 'medium,large',
			onEnter: function() {
				responslr.log('medium or large enter');
			}
		});
	}
};

/***********************************************************************************
	WINDOW
***********************************************************************************/
var oWindow												= {
	$:				null
};

/***********************************************************************************
	BODY
***********************************************************************************/
var oBody												= {
	$:				null
};

/***********************************************************************************
	HEADER
***********************************************************************************/
var oHeader												= {
	$:				null
};

/***********************************************************************************
	FOOTER
***********************************************************************************/
var oFooter												= {
	$:				null
};

/***********************************************************************************
	DOCUMENT READY
***********************************************************************************/
$(document).ready(function(){
	oGlobals.cacheJQueryObjects();
	oGlobals.init();
});