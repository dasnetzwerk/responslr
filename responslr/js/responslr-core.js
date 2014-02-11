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
		this.settings = loadAllSettings();

		for(var moduleIndex in this.loadedModules) {
			this[this.loadedModules[moduleIndex]].settings = getModuleSettings(this.loadedModules[moduleIndex]);
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
	this.addModule = function(moduleName) {
		if(typeof window["responslr_" + moduleName] != "undefined") {
			this[moduleName] = new window["responslr_" + moduleName]();

			this.loadedModules.push(moduleName);

			return this[moduleName];
		} else {
			console.error('responslr module "' + moduleName + '" does not exist!');

			return null;
		}
	}
}

var responslr = new responslr();