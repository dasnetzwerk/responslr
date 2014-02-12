/***********************************************************************************
	GLOBALS
***********************************************************************************/
var oGlobals											= {
	bDebug:							(document.location.hostname.indexOf('dev.') > -1),
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

		// Show gridhelper
		responslr.grid.showHelper();

		// Add breakpoint events
		responslr.grid.addBreakpointEvents({
			breakpoint: 'small',
			onEnter: function() {
				console.log('small enter');
			},
			onLeave: function() {
				console.log('small leave');
			}
		}, {
			breakpoint: 'medium,large',
			onEnter: function() {
				console.log('medium or large enter');
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