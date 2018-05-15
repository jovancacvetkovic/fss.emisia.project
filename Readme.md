# FSS Documentation

Creating, managing and runnig FSS application manual.


## Project Creation

Project FSS was created following next command:
	`sencha -sdk path/to/extjs/framework generate app FSS path/to/project/folder --modern` - This step generated basic ExtJS application.

Added cordova support via 
	`sencha cordova init com.emisia.fss FSS` - This step added support for cordova project so that mobile application can be created (eg APK). 
	
By doing this the `app.json` file is updated with platform support, this config is added to build profiles:
	
	"android": {
           "packager": "cordova",
           "cordova": {
               "config": {
                      "platforms": "android",
                      "id": "com.emisia.fss",
                      "name": "FSS"
               }
           },
           "toolkit": "modern",
           "theme": "theme-material"
        }

Cordova is installed via npm: `sudo npm install -g cordova`


## Adding a theme

Theme was genreated by running next command: 
	`sencha generate theme fssmaterial` - This added a new folder named fssmaterial in packages/local folder.


## Firebase support

Firebase is Google solution for Cloud Messaging (Push Notifications) also called GCM. Cordova plugin is added for firebase messaging via 
	`cordova plugin add cordova-plugin-firebase --save`


## Build & Run

There are three commands available to build and run ExtJS cordova application:
 - Building application is done via command: `sencha app build PROFILE`
 - Watch application is done via: `sencha app watch PROFILE`
 - To run application on emulator or android device: `sencha app run PROFILE`
    
If you want to run application on an emulator, you need to create AVD emulator with name `android` and if your phone is connected to a PC then it will default to your device.


## Debugging

Debugging web application is as always done via Developer tools. Debugging android devices is also done via Developer tools by navigating to `chrome://inspect/#devices` and choosing your device from the list of attached devices. Note that devices and emulators will be listed and can be inspected. 
Debugging devices you have to activate USB Debugging option located under Developer options, which can be activated if you tap 7 times on the Build number.


## Checkout / Clone project

Checking-out project: 
 - First you’ll need to create project folder. Using terminal navigate into created folder.
 - Initialize git: `git init`
 - Add remote origin: `git remote add origin http://git.emisia.lan/jcvetkovic/fss-emisia-project.git`
 - Download all source code: `git pull origin master`
 - Navigate into cordova folder
 - Run command: `cordova platform rm .idea` - This command will help idea run cordova app
 - And finally you can run `sencha app run android` or watch `sencha app watch android` application
    




