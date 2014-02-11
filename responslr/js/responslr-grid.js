function responslr_grid() {

	/***********************************************************************************
		PUBLIC PROPERTIES
	***********************************************************************************/

	this.breakpointEvents = [];
	this.previousBreakpoint = {};
	this.currentBreakpoint = {};
	this.windowWidth = 0;


	/***********************************************************************************
		PRIVATE PROPERTIES
	***********************************************************************************/

	var self = this;
	var resizeBound = false;


	/***********************************************************************************
		PUBLIC GRIDHELPER METHODS
	***********************************************************************************/

	this.showHelper = function() {

	};

	this.hideHelper = function() {

	};


	/***********************************************************************************
		PRIVATE BREAKPOINT METHODS
	***********************************************************************************/

	// Bind resize
	var bindResize = function() {
		if(!resizeBound) {
			$(window).resize(function() {
				setWindowWidth();

				var sNewBreakpoint = self.getCurrentBreakpoint();

				if(sNewBreakpoint != self.currentBreakpoint) {
					self.previousBreakpoint = self.currentBreakpoint;
					self.currentBreakpoint = sNewBreakpoint;

					// ZODO: Name in objekt ergänzen

					var oPreviousBreakpoint = self.settings.breakpoints[self.previousBreakpoint];
					var oCurrentBreakpoint = self.settings.breakpoints[self.currentBreakpoint];

					// Single breakpoint enter
					if(typeof self.breakpointEvents[self.currentBreakpoint] != 'undefined') {
						var aEnterCallbacks = self.breakpointEvents[self.currentBreakpoint]['enter'];

						for(var iEnterCallback in aEnterCallbacks) {
							aEnterCallbacks[iEnterCallback](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}

					// All breakpoints enter
					if(typeof self.breakpointEvents["*"] != 'undefined') {
						var aAllEnterCallbacks = self.breakpointEvents["*"]['enter'];

						for(var iAllEnterCallback in aAllEnterCallbacks) {
							aAllEnterCallbacks[iAllEnterCallback](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}

					// Single breakpoint leave
					if(typeof self.breakpointEvents[self.previousBreakpoint] != 'undefined') {
						var aLeaveCallbacks = self.breakpointEvents[self.previousBreakpoint]['leave'];

						for(var iLeaveCallback in aLeaveCallbacks) {
							aLeaveCallbacks[iLeaveCallback](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}

					// All breakpoints leave
					if(typeof self.breakpointEvents["*"] != 'undefined') {
						var aAllLeaveCallbacks = self.breakpointEvents["*"]['leave'];

						for(var iAllLeaveCallback in aAllLeaveCallbacks) {
							aAllLeaveCallbacks[iAllLeaveCallback](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}
				}
			});

			$(window).resize();

			resizeBound = true;
		}
	}

	// Set window width
	var setWindowWidth = function() {
		self.windowWidth = window.innerWidth;
	}


	/***********************************************************************************
		PUBLIC BREAKPOINT METHODS
	***********************************************************************************/

	// Add breakpoint event
	this.addBreakpointEvent = function(breakpoints, events, callback) {
		var aBreakpoints = breakpoints.split(',');
		var aEvents = events.split(',');

		for(var iBreakpoint in aBreakpoints) {
			var sBreakpointName = $.trim(aBreakpoints[iBreakpoint]);

			if(typeof self.breakpointEvents[sBreakpointName] == 'undefined') {
				self.breakpointEvents[sBreakpointName] = { 'enter': [], 'leave': [] };
			}

			for(var iEvent in aEvents) {
				var sEventName = $.trim(aEvents[iEvent]);

				self.breakpointEvents[sBreakpointName][sEventName].push(callback);
			}
		}

		// Bind resize event only on the first time
		bindResize();
	};

	// Get breakpoint by width
	this.getBreakpointByWidth = function(iWidth) {
		var oMatchedBreakpoint = {};

		for(var sBreakpoint in self.settings.breakpoints) {
			var oBreakpoint = self.settings.breakpoints[sBreakpoint];
			var iMinWidth = parseInt(oBreakpoint.minWidth);
			var iMaxWidth = parseInt(oBreakpoint.maxWidth);

			if(iMinWidth <= iWidth && (iMaxWidth >= iWidth || iMaxWidth == -1)) {
				oMatchedBreakpoint = sBreakpoint;
				break;
			}
		}

		return oMatchedBreakpoint;
	}

	// Get current breakpoint
	this.getCurrentBreakpoint = function() {
		return self.getBreakpointByWidth(self.windowWidth);
	};
}

responslr.addModule('grid');