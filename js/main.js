/***********************************************************************************
	GLOBALS
***********************************************************************************/
var oGlobals											= {
	bDebug:							(document.location.hostname.indexOf('dev.alenkrummenacher.ch') > -1),
	sLanguage:						$('html').attr('lang').split('-')[0],
	cacheJQueryObjects:				function() {
		oWindow.$										= $(window);
		oBody.$											= $('body');
		oHeader.$										= $('header');
		oFooter.$										= $('footer');
		oAnchorLinks.$									= $('.anchor-link');
		oAnchorLinks.oScroller.$						= $('html,body');
	},
	init:							function() {
		oBody.$.responsivehelper({
			showWindowSize: oGlobals.bDebug,
			showHeight: true,
			showGrid: oGlobals.bDebug,
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
		});

		oAnchorLinks.init();
	},
	oResponsiveHelper:				null,
	onBreakpointChange:				function() {
		oBody.$.unbind('touchstart');

		switch(oGlobals.oResponsiveHelper.currentBreakpoint.codeName) {
			/* Smartphone */
			case 's':
				oBody.$.bind('touchstart', function(e){});
			break;
			/* Tablet Portrait */
			case 'tp':
				oBody.$.bind('touchstart', function(e){});
			break;
			/* Tablet Landscape */
			case 'tl':
				oBody.$.bind('touchstart', function(e){});
			break;
			/* Desktop */
			case 'd':

			break;
			/* High Definition */
			case 'hd':

			break;
		}
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
	ANCHOR LINKS
***********************************************************************************/
var oAnchorLinks										= {
	$:				null,
	iDuration:		350,
	oScroller: 		{
		$:		null
	},
	init:			function() {
		if(document.location.hash) {
			oAnchorLinks.oScroller.$.scrollTop(0);
			oAnchorLinks.scrollTo($('' + document.location.hash));
		}

		oAnchorLinks.bind();
	},
	bind:			function() {
		oAnchorLinks.$.bind('click', function(e){
			e.preventDefault();
			oAnchorLinks.scrollTo($('#' + $(this).attr('href').replace('#','')));
		});
	},

	scrollTo:			function($scrollTarget) {
		if($scrollTarget.length) {
			var iScrollTo									= parseInt($scrollTarget.offset().top);

			if(iScrollTo > oHeader.$.height()) {
				iScrollTo									-= 25;
			}

			oAnchorLinks.oScroller.$.stop().animate({
					scrollTop: iScrollTo
				},
				{

					duration: oAnchorLinks.iDuration,
					easing: 'swing'
				}
			);
		}
	}
}

/***********************************************************************************
	DOCUMENT READY
***********************************************************************************/
$(document).ready(function(){
	oGlobals.cacheJQueryObjects();
	oGlobals.init();
});