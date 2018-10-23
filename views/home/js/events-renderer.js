const { ipcRenderer } = require('electron');

feed = function(){
    ipcRenderer.send('abrir-feed');
}

novo = function(){
    ipcRenderer.send('abrir-novo');
}

cardapio = function(){
    ipcRenderer.send('abrir-cardapio');
}

configuracoes = function(){
    ipcRenderer.send('abrir-configuracoes');
}