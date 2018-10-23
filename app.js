const { app, BrowserWindow, ipcMain } = require('electron');

const admin = require('firebase-admin');
let serviceAccountKey = require('./admin/config.json');

admin.initializeApp({
    credential : admin.credential.cert(serviceAccountKey),
    databaseURL : 'https://mself-1243c.firebaseio.com/',
    storageBucket : 'gs://mself-1243c.appspot.com'
});

let bdRef = admin.database().ref();
let storageRef = admin.storage().bucket();

const index = 'views/home/index.html';
const novo_prato = 'views/cardapio/formulario.html';

const path = require('path');

let mainWindow;

app.on('ready', createWindow);

function createWindow(){
    mainWindow = new BrowserWindow({
        width : 800,
        height : 600
    });

    mainWindow.loadFile(path.join(__dirname, index));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
  
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('inicio', () => {
    mainWindow.loadFile(path.join(__dirname, index));
});

ipcMain.on('abrir-novo', () => {
    mainWindow.loadFile(path.join(__dirname, novo_prato));
});

ipcMain.on('salva-prato', (e, prato) => {

    let image = prato.image;
    prato.image = null;

    key = bdRef.child('/prato').push(prato).key;
    
    if(image){
        storageRef.upload(image, {destination : '/images/' + key + '/foto.jpg'})
            .then(function(snapshot){
                console.log(snapshot);
                prato.image = snapshot[1].mediaLink;
                bdRef.child('/prato/' + key).update(prato);
            });
    }
});
