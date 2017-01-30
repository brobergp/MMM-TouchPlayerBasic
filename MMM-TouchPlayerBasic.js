/* global Module */

/* Magic Mirror
 * Module: MMM-TouchPlayerBasic
 *
 *
 * By Pierre Broberg, based on code from MMM-Myvoiceradio by gismo2006
 * MIT Licensed.
 */

Module.register("MMM-TouchPlayerBasic",{

// Default module config.
	defaults: {
		stations: [
			"R radio", // Separation by space, First part "R" is the .png image filename, the second is .sh script name
			"P playlist" // The default icons are R for radiostation and P for playlist icon.
		]

	},
	getStyles: function() {
		return ["style.css"];
	},

/* voice part
notificationReceived: function(notification, payload, sender) {
var self = this;
	if (notification === "Radiostop"){
       self.sendSocketNotification('Radiostop', {});
    }
	if (notification === "VolumeUp"){
       self.sendSocketNotification('VolumeUp', {});
    }
	if (notification === "VolumeDown"){
       self.sendSocketNotification('VolumeDown', {});
    }
	if (notification === "Mute"){
       self.sendSocketNotification('Mute', {});
    }
	else {
       self.sendSocketNotification(notification, {});
	}
},
*/



	// Override dom generator.
	getDom: function() {

		var self = this;
		var stationsArray = self.config.stations;
		var stationListWidth;
		if (stationsArray.length < 4) {stationListWidth = 290;}
		else {stationListWidth = ( stationsArray.length * 60 ) + 40;}

		var wrapper = document.createElement("div");

		var mainButton = document.createElement("div");
			mainButton.innerHTML = '<img src="modules/MMM-TouchPlayerBasic/images/mainButton.png" style="cursor:pointer"></img>';
			mainButton.className = "mainButton";
			mainButton.addEventListener("click", () => DisplayMenu());

		var stationMenu = document.createElement("div");
			stationMenu.className = "stationMenu";

		var stationList = document.createElement("div")
		stationList.innerHTML = "<img class='imgLeft' src='modules/MMM-TouchPlayerBasic/images/stationListEnd.png'><img class='imgRight' src='modules/MMM-TouchPlayerBasic/images/stationListStart.png'>";
		stationList.className = "stationList";
		stationList.style.width = stationListWidth + "px";
		stationMenu.appendChild(stationList);

		var statindex;
		for (statindex = 0; statindex < stationsArray.length; ++statindex) {
			var strsplit = stationsArray[statindex].split(" ")
			let scriptfile = strsplit[1];
			var statplace = (statindex + 1) * 60;
			var station = strsplit[1];
				station = document.createElement("div");
				station.innerHTML = '<img src="modules/MMM-TouchPlayerBasic/images/' + strsplit[0] + '.png" style="cursor:pointer"></img><div class="rotate">' + scriptfile + '</div>';
				station.className = "stationButton";
				station.style.right = statplace + "px";
				station.addEventListener("click", () => play(scriptfile));
				stationMenu.appendChild(station);
		};

		wrapper.appendChild(stationMenu);

		function DisplayMenu() {
					stationMenu.style.display = "block";
					topMenu.style.display = "block";

					stationMenu.style.webkitAnimationName = "stationMenuAnimation";
					topMenu.style.webkitAnimationName = "topMenuAnimation";
		};

		function play(scriptfile) {
			stationMenu.style.display = "none";
			self.sendSocketNotification(scriptfile, {});
		};

		var topMenu = document.createElement("div");
			topMenu.className = "topMenu";

		var stopper = document.createElement("div");
			stopper.className = "stopButton";
			stopper.innerHTML = '<img src="modules/MMM-TouchPlayerBasic/images/stopButton.png" style="cursor:pointer"></img>';
			stopper.addEventListener("click", () => radiostop());

		function radiostop() {
			stationMenu.style.display = "none";
			topMenu.style.display = "none";
			self.sendSocketNotification('Radiostop', {});
		};

		var volumeUp = document.createElement("div");
			volumeUp.className = "volumeupButton";
			volumeUp.innerHTML = '<img src="modules/MMM-TouchPlayerBasic/images/volumeupButton.png" style="cursor:pointer"></img>';
			volumeUp.addEventListener("click", () => volumecontrol('VolumeUp'));
		var volumeDown = document.createElement("div");
			volumeDown.className = "volumedownButton";
			volumeDown.innerHTML = '<img src="modules/MMM-TouchPlayerBasic/images/volumedownButton.png" style="cursor:pointer"></img>';
			volumeDown.addEventListener("click", () => volumecontrol('VolumeDown'));
		var volumeMute = document.createElement("div");
			volumeMute.className = "muteButton";
			volumeMute.innerHTML = '<img src="modules/MMM-TouchPlayerBasic/images/muteButton.png" style="cursor:pointer"></img>';
			volumeMute.addEventListener("click", () => volumecontrol('Mute'));

		function volumecontrol(action) {
			self.sendSocketNotification(action, {});
		};

		topMenu.appendChild(stopper);
		topMenu.appendChild(volumeUp);
		topMenu.appendChild(volumeDown);
		topMenu.appendChild(volumeMute);

		wrapper.appendChild(topMenu);
		wrapper.appendChild(mainButton);
		return wrapper;

	}
});
