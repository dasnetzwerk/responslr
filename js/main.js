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
		responslr.grid.addBreakpointEvent("small,large", "enter", function() {
			console.log('small or large entered');
		});

		responslr.grid.addBreakpointEvent("small", "leave", function() {
			console.log('small leaved');
		});

		responslr.grid.addBreakpointEvent("*", "leave", function() {
			console.log('all leaved');
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