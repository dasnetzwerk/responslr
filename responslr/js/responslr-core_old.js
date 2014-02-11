function responslr() {

	var self = this;

	// Config
	var sSettingsElement = 'html';
	var sSettingsPseudo = 'before';

	// Core
	this.settings = {};
	this.loadedModules = [];

	// PUBLIC: Init
	this.init = function() {
		var loadModules = arguments;

		this.settings = loadAllSettings();

		//this.loadedModules.push(moduleName);

		for(var moduleIndex in loadModules) {
			var moduleName = loadModules[moduleIndex];

			if(typeof window["responslr_" + moduleName] != "undefined") {
				this[moduleName] = new window["responslr_" + moduleName]();
				this[moduleName].settings = getModuleSettings(moduleName);
			} else {
				console.error('responslr module "' + moduleName + '" does not exist!');
			}
		}
	}

	// PRIVATE: Load settings
	var loadAllSettings = function() {
		var jsonContent = window.getComputedStyle(document.querySelector(sSettingsElement), sSettingsPseudo).getPropertyValue('content');
		var oSettings = JSON.parse(jsonContent.slice(1, -1).replace(/\\"/ig, '"'));

		return oSettings;
	}

	// PRIVATE: Get settings
	var getModuleSettings = function(moduleName) {
		var moduleSettings = {};

		if(typeof self.settings[moduleName] != 'undefined') {
			moduleSettings = self.settings[moduleName];
		}

		return moduleSettings;
	}

	// PUBLIC: Add module
	/*this.addModule = function(moduleName) {
		this[moduleName] = new window["responslr_" + moduleName]();

		this.loadedModules.push(moduleName);

		return this[moduleName];
	}*/
}

var responslr = new responslr();