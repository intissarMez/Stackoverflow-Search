var actions	= {};

actions.getToStackoverflow = function(){
	
	studio.showProgressBarOnStatusBar("Connecting to Stackoverflow website ...")

	var q = studio.prompt('What is your issue ninja ?');
	
	
	var result = queryStackoverflow(q);
	
	studio.hideProgressBarOnStatusBar();
};

function queryStackoverflow(query){
	var url = "http://stackoverflow.com/search?q=" + encodeURIComponent(query);
	
	/*
	 * Open inside the studio
	 */
	 return studio.extension.openPageInTab(url, "StackOverflow");

	/*
	 * Open in the browser
	 */ 
	//return openURLOnBrowser(url);
}

function openURLOnBrowser(url){
	
	var cmd = "";
	
	/*
	 * We have a studio available for both Windows and Linux
	 */ 
	 if (os.isMac) {
	 	cmd = "open  " + url;
	 } else if (os.isWindows) {
	 	cmd = "start " + url;
	 } else {
		/*
		 * Shouldn't happen
		 */ 
		 return false;		
		}

		return runCommand(cmd);
	}

	function runCommand(cmd){
		var shell = require("shellWorker");
		try{
			var worker = shell.create(cmd);
		}catch(e){
			return false;	
		}

		return true;
	}

	exports.handleMessage = function handleMessage(message) {
		var action	= message.action;

		if(typeof actions[action] === "function"){
		/*
		 * Call the corresponding function
		 */ 
		 actions[action](message);
		} else {
		/*
		 * unknown action
		 */ 
		 return false;
		}
	};