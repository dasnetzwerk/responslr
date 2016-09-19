function responslr() {

	/***********************************************************************************
		PUBLIC PROPERTIES
	***********************************************************************************/

	this.settings = {};
	this.isLive = false;
	this.isDev = true;
	this.support = {};


	/***********************************************************************************
		PRIVATE PROPERTIES
	***********************************************************************************/

	var self = this;
	var aLoadedModules = [];

	var sClassesElement = document.querySelector('html');
	var sSettingsElement = 'html';
	var sSettingsPseudo = '::before';


	/***********************************************************************************
		PRIVATE CORE METHODS
	***********************************************************************************/

	// Load all settings
	var loadAllSettings = function() {
		var oSettings = {};
		var jsonContent = window.getComputedStyle(document.querySelector(sSettingsElement), sSettingsPseudo).getPropertyValue('content');

		jsonContent = jsonContent.slice(1, -1).replace(/\\"/ig, '"');

		try {
			oSettings = JSON.parse(jsonContent);
		} catch(e) {}

		return oSettings;
	}

	// Get module settings
	var getModuleSettings = function(sModuleName) {
		var oModuleSettings = {};

		if(typeof self.settings[sModuleName] != 'undefined') {
			oModuleSettings = self.settings[sModuleName];
		}

		return oModuleSettings;
	}

	// Apply fixes
	var applyFixes = function() {
		// Touch device hover fix
		document.addEventListener('touchstart', function(){}, true);
	}

	// Detect css support
	var detectCssSupport = function(featurename) {
		var supported = false;
		var domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
		var elm = document.createElement('div');

		if(elm.style[featurename] !== undefined ) {
			supported = true;
		}

		if(supported === false) {
			for(var i = 0; i < domPrefixes.length; i++) {
				if(elm.style[domPrefixes[i] + featurename] !== undefined) {
					supported = true;
					break;
				}
			}
		}

		return supported;
	}

	// Check support
	var checkFeatures = function() {
		// Features to check
		var features = [
			{
				key: 'touch',
				classes: ['touch'],
				support: ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || typeof window.DocumentTouch != 'undefined')
			},
			{
				key: 'transform',
				classes: ['no-transform'],
				negate: true,
				support: detectCssSupport('transform')
			},
			{
				key: 'transition',
				classes: ['no-transition'],
				negate: true,
				support: detectCssSupport('transition')
			}
		];

		// Check features
		for(var feature_index in features) {
			var addClass = features[feature_index].support;

			self.support[features[feature_index].key] = features[feature_index].support;
			features[feature_index].negate = features[feature_index].negate || false;

			if(features[feature_index].negate) {
				addClass = !addClass;
			}

			if(addClass) {
				for(var classes_index in features[feature_index].classes) {
					var classList = ( sClassesElement.className != '' ? sClassesElement.className.split(' ') : [] );
					classList.push(features[feature_index].classes[classes_index]);
					sClassesElement.className = classList.join(' ');
				}
			}
		};
	}

	// Check OS
	var checkOS = function() {
		// OS to check
		var os = [
			{
				classes: ['win'],
				pattern: /(Windows)/i
			},
			{
				classes: ['mac'],
				pattern: /(Macintosh)/i
			},
			{
				classes: ['linux'],
				pattern: /(Linux)/i
			}
		];

		// Check OS
		for(var os_index in os) {
			var matched = os[os_index].pattern.test(navigator.userAgent);

			if(matched) {
				for(var classes_index in os[os_index].classes) {
					var classList = ( sClassesElement.className != '' ? sClassesElement.className.split(' ') : [] );
					classList.push(os[os_index].classes[classes_index]);
					sClassesElement.className = classList.join(' ');
				}

				break;
			}
		};
	}

	// Check devices
	var checkDevices = function() {
		// Devices to check
		var devices = [
			{
				classes: ['mobile', 'iphone', 'ios', 'fb'],
				pattern: /iPhone.*?FBIOS/i
			},
			{
				classes: ['tablet', 'ipad', 'ios', 'fb'],
				pattern: /iPad.*?FBIOS/i
			},
			{
				classes: ['mobile', 'iphone', 'ios'],
				pattern: /iPhone/i
			},
			{
				classes: ['tablet', 'ipad', 'ios'],
				pattern: /iPad/i
			},
			{
				classes: ['mobile', 'android'],
				pattern: /Android.*Mobile/i
			},
			{
				classes: ['tablet', 'android'],
				pattern: /Android/i
			},
			{
				classes: ['mobile', 'windowsphone'],
				pattern: /Windows Phone/i
			},
			{
				classes: ['mobile', 'blackberry'],
				pattern: /BlackBerry/i
			},
			{
				classes: ['tablet', 'playbook'],
				pattern: /PlayBook/i
			},
			{
				classes: ['mobile', 'operamobile'],
				pattern: /Opera Mobi/i
			},
			{
				classes: ['tablet', 'kindlefire'],
				pattern: /Kindle Fire/i
			},
			{
				classes: ['tablet', 'kindle'],
				pattern: /Kindle/i
			}
		];

		// Check devices
		for(var devices_index in devices) {
			var matched = devices[devices_index].pattern.test(navigator.userAgent);

			if(matched) {
				for(var classes_index in devices[devices_index].classes) {
					var classList = ( sClassesElement.className != '' ? sClassesElement.className.split(' ') : [] );
					classList.push(devices[devices_index].classes[classes_index]);
					sClassesElement.className = classList.join(' ');
				}

				break;
			}
		};
	}

	// Check browser
	var checkBrowser = function() {
		// Browser to check
		var browser = [
			{
				classes: ['ie', 'ie8', 'trident'],
				pattern: /(MSIE 8)/i
			},
			{
				classes: ['ie', 'ie9', 'trident'],
				pattern: /(MSIE 9)/i
			},
			{
				classes: ['ie', 'trident'],
				pattern: /(MSIE|Trident)/i
			},
			{
				classes: ['edge', 'trident'],
				pattern: /(Edge\/)/i
			},
			{
				classes: ['chrome', 'webkit', 'blink'],
				pattern: /(Chrome\/)/i
			},
			{
				classes: ['safari', 'webkit'],
				pattern: /(Version\/.*Safari\/)/i
			},
			{
				classes: ['firefox', 'gecko'],
				pattern: /(Gecko\/.*Firefox\/)/i
			}
		];

		// Check browser
		for(var browser_index in browser) {
			var matched = browser[browser_index].pattern.test(navigator.userAgent);

			if(matched) {
				for(var classes_index in browser[browser_index].classes) {
					var classList = ( sClassesElement.className != '' ? sClassesElement.className.split(' ') : [] );
					classList.push(browser[browser_index].classes[classes_index]);
					sClassesElement.className = classList.join(' ');
				}

				break;
			}
		};
	}

	/***********************************************************************************
		PUBLIC CORE METHODS
	***********************************************************************************/

	// Init core
	this.init = function() {
		this.settings = loadAllSettings();

		// Load and init modules
		for(var iModuleIndex in aLoadedModules) {
			this[aLoadedModules[iModuleIndex]].settings = getModuleSettings(aLoadedModules[iModuleIndex]);

			if(typeof this[aLoadedModules[iModuleIndex]].init != "undefined") {
				this[aLoadedModules[iModuleIndex]].init();
			}
		}

		// Apply fixes
		applyFixes();

		// Check browser support
		checkFeatures();

		// Check OS
		checkOS();

		// Check devices
		checkDevices();

		// Check browser
		checkBrowser();
	}

	// Add module to the core
	this.addModule = function(sModuleName) {
		if(typeof window['responslr_' + sModuleName] != 'undefined') {
			this[sModuleName] = new window['responslr_' + sModuleName]();

			aLoadedModules.push(sModuleName);

			return this[sModuleName];
		} else {
			console.error('responslr module "' + sModuleName + '" does not exist!');

			return null;
		}
	}

	// Set live url
	this.setLiveUrl = function() {
		var isLive = false;

		for(url in arguments) {
			isLive = document.location.hostname.match(new RegExp('^' + arguments[url] + '$', 'i')) !== null;

			if(isLive) break;
		}

		self.isLive = isLive;
		self.isDev = !isLive;
	}

	// Set dev url
	this.setDevUrl = function() {
		var isDev = false;

		for(url in arguments) {
			isDev = document.location.hostname.match(new RegExp('^' + arguments[url] + '$', 'i')) !== null;

			if(isDev) break;
		}

		self.isDev = isDev;
		self.isLive = !isDev;
	}

	// Custom log function
	this.log = function(output) {
		if(!self.isLive) {
			console.log(output);
		}
	}

	// Custom warn function
	this.warn = function(output) {
		if(!self.isLive) {
			console.warn(output);
		}
	}

	// Custom error function
	this.error = function(output) {
		if(!self.isLive) {
			console.error(output);
		}
	}
}

// Create main responslr object
var responslr = new responslr();
