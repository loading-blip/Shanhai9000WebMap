# Shanhai 9000 Web Map

![Version](https://img.shields.io/badge/version-0.1.0-blue) | Map collection progress (1/26) ![Progress](https://geps.dev/progress/1)

Another web version of the NineSols map.

Like other web game maps, it can choose to hide markers.

This map will collect:

- explore (chest,lockedChest,bottle,StoryEvent,etc...)
- NYMPH Interaction (Switch,rope,hackPoint)
- questItem (StoryItem,etc...)
- puzzle  (bell,NYMPH Puzzle,zone)
- etc...

## For Developer

This program use  `npm 10.9.0` ,require `Python` in PATH and install `pyyaml` library

If running in linx/unix ,should install `gdal-bin` library.

If running windows, should use osgeo4w setup Tools.

Whether you use `apt-get, brew, yum, dpkg or even opkg` - as long as `gdal2tiles.py` in PATH and runs properly, you're always right!

\* Run `npm run install`  to install dependency package.

\* Run `npm run updateMarker` to convert json.

\* Run `npm run splitMap` to use [GDAL](https://gdal.org/en/stable/) to spilt map

To make static web ,run the ablove three frist. Then `npm run build`. Target file is `dist/index.html`

## For User

Congratulations! Jump to Releases page download. **(There are currently no releases available)**

## Demo

`v0.1.0-video.mp4`

<video src="image/v0.1.0-video.mp4" autoplay></video>

## Current direction

- [X] Locate random types of marks locations for test
- [X] **Beautify UI interface**
- [ ] Make icon for each marker
- [ ] Clean up program Code
- [ ] Can hide individual tags and use cookies to store hidden tags ^1^
- [ ] Perhaps CSS animations will be added
- [ ] etc...

Note:

1. I'm not sure if local files can store cookies, but the AI's answer tells me that not all browsers support them by default
