function responslr() {

	/***********************************************************************************
		PUBLIC PROPERTIES
	***********************************************************************************/

	this.settings = {};


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


	/***********************************************************************************
		PUBLIC CORE METHODS
	***********************************************************************************/

	// Init core
	this.init = function() {
		this.settings = loadAllSettings();

		for(var iModuleIndex in aLoadedModules) {
			this[aLoadedModules[iModuleIndex]].settings = getModuleSettings(aLoadedModules[iModuleIndex]);
		}
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
}

// Create main responslr object
var responslr = new responslr();