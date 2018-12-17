function responslr_grid() {

	/***********************************************************************************
		PRIVATE PROPERTIES
	***********************************************************************************/

	var self = this;
	var bResizeAlreadyBound = false;
	var aBreakpointEvents = [];
	var oPreviousBreakpoint = {};
	var oCurrentBreakpoint = {};
	var oEvents = $({});
	var sResizeEventName = 'resize:responslr';

	/***********************************************************************************
		INIT
	***********************************************************************************/
	this.init = function() {
		// Set initial breakpoint
		//oCurrentBreakpoint = checkCurrentBreakpoint();

		// Bind resize
		$(window).bind('resize.responslr', function() {
			// Trigger resize
			self.triggerResize();
		});
	}

	/***********************************************************************************
		PUBLIC GRIDHELPER METHODS
	***********************************************************************************/

	// Show grid helper
	this.showHelper = function() {
		var settings = self.settings.helper;

		var maxColumns = 0;

		for(breakpoint in self.settings.breakpoints) {
			if(maxColumns < self.settings.breakpoints[breakpoint].columns) {
				maxColumns = self.settings.breakpoints[breakpoint].columns;
			}
		}

		if(typeof settings !== 'undefined' && settings.show) {
			// Grid
			if(settings.gridShow) {
				var $gridContainer = $('<div />').attr('id', settings.gridId);
				var $grid = $('<div />').addClass(self.settings.rowClass).addClass(self.settings.containerClass);

				// Create column elements
				for(var i = 1; i <= maxColumns; i++) {
					var $column = $('<div></div>').addClass(self.settings.columnClass).append('<div />');

					$grid.append($column);
				};

				// Add classes to column elements
				for(breakpoint in self.settings.breakpoints) {
					for(var j = 0; j < self.settings.breakpoints[breakpoint].columns; j++) {
						$grid.children().eq(j).addClass(breakpoint + '-1').addClass(responslr.settings.visibility.showClassPrefix + breakpoint);
					}
				}

				$gridContainer.append($grid);
				$('body').append($gridContainer);
			}

			// Info box
			var $info = $('<div></div>').attr('id', settings.infoId);

			// Show breakpoint name
			if(settings.breakpointShow) {
				for(breakpoint in self.settings.breakpoints) {
					$info.append('<span class="' + responslr.settings.visibility.showClassPrefix + breakpoint + '">' + breakpoint + '</span>');
				}
			}

			if(settings.gridShow) {
				var $checkbox = $('<input type="checkbox" />').bind('click', function() {
					$gridContainer.toggleClass(settings.gridShowerClass);
				});

				$info.append($checkbox);
			}

			$('body').append($info);
		}
	};

	// Hide grid helper
	this.hideHelper = function() {
		var settings = self.settings.helper;

		$('#' + settings.gridId + ', #' + settings.infoId).remove();
	};

	// Add resize event
	this.resize = function() {
		switch(arguments.length) {
			case 1:
				oEvents.bind(sResizeEventName, arguments[0]);
				break;
			case 2:
				oEvents.bind(sResizeEventName, arguments[0], arguments[1]);
				break;
			default:
				self.triggerResize();
		}
	};

	// Trigger resize event
	this.triggerResize = function(data) {
		data = data || null;

		if(data == null) {
			oEvents.trigger(sResizeEventName);
		} else {
			oEvents.trigger(sResizeEventName, data);
		}
	};

	/***********************************************************************************
		PRIVATE BREAKPOINT METHODS
	***********************************************************************************/

	// Bind resize
	var bindResize = function() {
		if(!bResizeAlreadyBound) {
			$(window).unbind('resize.responslr');

			$(window).bind('resize.responslr', function() {
				var oNewBreakpoint = checkCurrentBreakpoint();

				// Trigger breakpoint change
				if(oNewBreakpoint.name != oCurrentBreakpoint.name) {
					oPreviousBreakpoint = oCurrentBreakpoint;
					oCurrentBreakpoint = oNewBreakpoint;

					// Trigger resize
					self.triggerResize();

					// Single breakpoint leave
					if(typeof aBreakpointEvents[oPreviousBreakpoint.name] != 'undefined') {
						var aLeaveCallbacks = aBreakpointEvents[oPreviousBreakpoint.name]['onLeave'];

						for(var iCallbackIndex in aLeaveCallbacks) {
							aLeaveCallbacks[iCallbackIndex](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}

					// All breakpoints leave
					if(typeof aBreakpointEvents["*"] != 'undefined') {
						var aAllLeaveCallbacks = aBreakpointEvents["*"]['onLeave'];

						for(var iAllLeaveCallbackIndex in aAllLeaveCallbacks) {
							aAllLeaveCallbacks[iAllLeaveCallbackIndex](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}

					// Single breakpoint enter
					if(typeof aBreakpointEvents[oCurrentBreakpoint.name] != 'undefined') {
						var aEnterCallbacks = aBreakpointEvents[oCurrentBreakpoint.name]['onEnter'];

						for(var iEnterCallbackIndex in aEnterCallbacks) {
							aEnterCallbacks[iEnterCallbackIndex](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}

					// All breakpoints enter
					if(typeof aBreakpointEvents["*"] != 'undefined') {
						var aAllEnterCallbacks = aBreakpointEvents["*"]['onEnter'];

						for(var iAllEnterCallbackIndex in aAllEnterCallbacks) {
							aAllEnterCallbacks[iAllEnterCallbackIndex](oCurrentBreakpoint, oPreviousBreakpoint);
						}
					}
				} else {
					// Trigger resize
					self.triggerResize();
				}
			});

			bResizeAlreadyBound = true;
		}
	}

	// Check current breakpoint
	var checkCurrentBreakpoint = function() {
		return self.getBreakpointByWidth(self.getWindowWidth());
	};

	/***********************************************************************************
		PUBLIC BREAKPOINT METHODS
	***********************************************************************************/

	// Add breakpoint event
	this.addBreakpointEvents = function() {

		// Get breakpoint events
		for(var iEventIndex in arguments) {
			var oBreakpointEvent = arguments[iEventIndex];

			oBreakpointEvent.breakpoint = oBreakpointEvent.breakpoint || '*';
			oBreakpointEvent.onEnter = oBreakpointEvent.onEnter || null;
			oBreakpointEvent.onLeave = oBreakpointEvent.onLeave || null;

			var aBreakpoints = oBreakpointEvent.breakpoint.split(',');

			for(var iBreakpointIndex in aBreakpoints) {
				var sBreakpointName = aBreakpoints[iBreakpointIndex];

				if(typeof aBreakpointEvents[sBreakpointName] == 'undefined') {
					aBreakpointEvents[sBreakpointName] = { 'onEnter': [], 'onLeave': [] };
				}

				if(oBreakpointEvent.onEnter != null) {
					aBreakpointEvents[sBreakpointName]['onEnter'].push(oBreakpointEvent.onEnter);
				}

				if(oBreakpointEvent.onLeave != null) {
					aBreakpointEvents[sBreakpointName]['onLeave'].push(oBreakpointEvent.onLeave);
				}
			}
		}

		// Bind resize event
		bindResize();

		// Trigger resize event once
		$(window).resize();
	};

	// Get breakpoint by width
	this.getBreakpointByWidth = function(iWidth) {
		var oMatchedBreakpoint = {};


		for(var sBreakpointName in self.settings.breakpoints) {
			var oBreakpoint = self.settings.breakpoints[sBreakpointName];
			var iMinWidth = parseInt(oBreakpoint.minWidth);
			var iMaxWidth = parseInt(oBreakpoint.maxWidth);

			if(iMaxWidth == 0) {
				iMaxWidth = iWidth;
			}

			if(iMinWidth <= iWidth && (iMaxWidth >= iWidth || iMaxWidth == -1)) {
				oMatchedBreakpoint = oBreakpoint;
				break;
			}
		}

		return oMatchedBreakpoint;
	}

	// Get current breakpoint
	this.getCurrentBreakpoint = function() {
		if(typeof oCurrentBreakpoint.name === 'undefined') {
			return checkCurrentBreakpoint();
		} else {
			return oCurrentBreakpoint;
		}
	}
	
	// Check if breakpoint
	this.isBreakpoint = function(breakpoint) {
		if(typeof breakpoint === 'string') {
			breakpoint = breakpoint.split(',');
		}

		var isBreakpoint = false;

		for(i in breakpoint) {
			if(this.getCurrentBreakpoint().name === breakpoint[i]) {
				isBreakpoint = true;
				break;
			}
		}

		return isBreakpoint;
	}

	// Get previous breakpoint
	this.getPreviousBreakpoint = function() {
		return oPreviousBreakpoint;
	}

	// Get window width
	this.getWindowWidth = function() {
		return window.innerWidth;
	}
}

// Add grid module to the responslr core
responslr.addModule('grid');
