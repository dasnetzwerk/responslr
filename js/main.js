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
		/*oBody.$.responsivehelper({
			showWindowSize: false,
			showHeight: true,
			showGrid: true,
			breakpoints: {
				hd	 : {
					name: 'High Definition',
					breakpoint: 1281
				},
				d	 : {
					name: 'Desktop',
					breakpoint: 1025
				},
				tl	 : {
					name: 'Tablet Landscape',
					breakpoint: 961
				},
				tp	 : {
					name: 'Tablet Portrait',
					breakpoint: 641
				},
				s	 : {
					name: 'Smartphone',
					breakpoint: 1
				}
			}
		});*/
	},
	/*oResponsiveHelper:				null,
	onBreakpointChange:				function() {
		oBody.$.unbind('touchstart');

		// TODO: Responsive-helper - remove inline styles
		switch(oGlobals.oResponsiveHelper.currentBreakpoint.codeName) {

			case 's':
				oBody.$.bind('touchstart', function(e){});
			break;

			case 'tp':
				oBody.$.bind('touchstart', function(e){});
			break;

			case 'tl':
				oBody.$.bind('touchstart', function(e){});
			break;

			case 'd':

			break;

			case 'hd':

			break;
		}
	}*/
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