# MMM-TouchPlayerBasic<br>
The MM2 module that lets you play webradio mp3 streams and local m3u playlists on the touch of a finger.<br>
<br>
<br>
Preview of the module in the different states (nothing playing, selection, playing) :<br>
http://www.pierrejavel.com/temp/radioplayer.png


<h2>IMPORTANT!</h2>
This module requires that you have mpg123 installed.<br>
To install it run : sudo apt-get install mpg123
<br>
<br>
<br>
This is a <b>Very Basic</b> Mp3 player, it lacks buttons for "previous" and "next" on the playlists,<br>
therefor the playlists are default set to play a random mp3,<br>
if you select the same playlist again it will restart mpg123 and choose another random mp3 (which in shuffle mode basically is the same as the next button).<br>
<br>
The volume and mute buttons are executing commands for the main ALSA mixer on your RaspberryPi,<br>
this means that if you have a voice-module that speaks to you or have notification/alarm sounds, you will change the volume of that as well.<br>
<br>
mpg123 only supports m3u playlists and mp3 files,<br>
so if your choice of radiostation only has .pls playlists and/or AAC audio files this module won't work.<br>
<br>
When you name your stations and playlists in the config, make sure you name your files exactly the same

	For an example:
	if you add "R superawesomeradio" to the config list
	your .sh file should be named superawesomeradio.sh and the default Icon for radiostation will be used (R.png)

all .sh files should be placed in the "stations" folder, even the playlists.<br>
all .png image files should be placed in the "images" folder.
<br>
<br>
<br>
<br>
<b>Scriptfile .sh</b><br>
	here is the script file explained :

		sudo killall mpg123  // this is so all previous mpg123 instances are stopped before starting a new one, this prevents multiple stations and files to be played simultaniously

		sleep 0.1 // a short pause between commands is needed for the killall to work

		mpg123 -Z -@ /home/pi/MagicMirror/modules/mm-music-player/music/all.m3u  // here is an example of a local m3u playlist, the -Z option is for random file selection within the playlist

		mpg123 http://fm01-icecast.mtg-r.net/fm02_mp3 // here is an example of a radiostation to be played. Use only one mpg123 command in each file.


Make sure the .sh script files you create are executable, otherwise the scripts will not run.
To make it executable via the terminal use : chmod +x filename.sh  
<br>
<br>
<br>
<br>
<b>Icons/images .png</b><br>
	Default values for icons are "R" for radiostations and "P" for playlists.<br>
	You can add your own images, for an example the radiostations logo, instead of the default icon.<br>
	Replace R (or P) for lets say LOGO before the stations name,<br>
	you should then add your image file named LOGO.png in the images folder.<br>
<br>
	For spacing purposes, the image has to be 60px wide.
	<br>
<br>
<br>
<b>Tip!</b><br>
	The player is designed to work on the right side of the mirror and should be placed in the bottom_right region.<br>
	You can adjust the placement of the module within the region by adding this to your custom.css<br>

		.MMM-TouchPlayerBasic {
	    		position: absolute;
	    		bottom: -25px;
	    		right: -15px;
		}

	Changing the bottom/right values you can move it around.<br>

<br>
<br>
<br>
<br>
<h3>Configuration Example</h3>
	Remember the name of your .sh scriptfile should be exactly as the playlist/station you put in the config!<br>
	(Note! for "R example" to work the proper .sh filename should be "example.sh")

````javascript
{
	module: 'MMM-TouchPlayerBasic',
		position: 'bottom_right',
		config: {
			stations: [
				"R radio", // Separation by space, First part "R" is the .png image filename, the second is .sh script name
				"P playlist" // The default icons are R for radiostation and P for playlist icon.
				]

		}

},
````

<br>
<br>
<br>

<i>This module is based on code from <a href="https://github.com/gismo2006/MMM-Myvoiceradio">gismo2006s module MMM-voiceradio</a> which uses a similar node_helper to execute scriptfiles.</i>
