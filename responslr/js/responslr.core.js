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

	// Check touch support
	var checkBrowserSupport = function() {
		// Touch
		self.support.touch = ('ontouchstart' in window || 'onmsgesturechange' in window);
	}


	/***********************************************************************************
		PUBLIC CORE METHODS
	***********************************************************************************/

	// Init core
	this.init = function() {
		this.settings = loadAllSettings();

		// Load modules
		for(var iModuleIndex in aLoadedModules) {
			this[aLoadedModules[iModuleIndex]].settings = getModuleSettings(aLoadedModules[iModuleIndex]);
		}

		// Apply fixes
		applyFixes();

		// Check browser support
		checkBrowserSupport();
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