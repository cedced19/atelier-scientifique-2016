'use strict';
const electron = require('electron');
const app = electron.app;

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		icon: 'favicon.png',
		title: 'Atelier Scientifique'
	});
	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}/*
	var path = require('app').getPath('exe');
	var json2csv = require('deepjson2csv');
	var join = require('path').join;
	var fs = require('fs');

	json2csv({data: localStorageService.get('players'), fields: ['name', 'firstName']}, function(err, csv) {
		if (err) console.log(err);
		fs.writeFile(join(path, 'players.csv'), csv, function(err) {
			if (err) throw err;
			console.log('file saved');
		});
	});*/
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
