const { ipcRenderer } = require('electron');

inicio = function(){
    ipcRenderer.send('inicio');
}

$('#titulo-prato').on('keyup', function(){
    $('#titulo-prato-demo').children('span').text($('#titulo-prato').val());
});

$('#descricao-prato').on('keyup', function(){
    $('#descricao-prato-demo').children('span').text($('#descricao-prato').val());
});

//$('#valor-prato').on('change', calculaPreco);
//$('#desconto-prato').on('change', calculaPreco);

$('#valor-prato').on('keyup', calculaPreco);

$('#desconto-prato').on('keyup', calculaPreco);

function calculaPreco(){

    let valor = $('#valor-prato').val();
    let desconto = $('#desconto-prato').val();

    let descontoReal = (( valor * desconto ) / 100);
    let preco = valor - descontoReal;

    $('#desconto-prato-real').attr('value', descontoReal);
    $('#preco-prato').attr('value', preco);
    $('#preco-prato-demo').children('span').text(preco);
}

inputImagem = function(){
    var inputFile = $("#img-prato")[0].files[0];
    $('#img-prato-label').text(inputFile.name);
    $('#img-prato-demo').attr('src', inputFile.path);
}

function salvar(){
    let prato = {
        codigo : $('#codigo-prato').val(),
        titulo : $('#titulo-prato').val(),
        descricao : $('#descricao-prato').val(),
        valor : $("#valor-prato").val(),
        desconto : $('#desconto-prato').val(),
        preco : $('#preco-prato').val(),
    };
    
    var inputFile = $("#img-prato");

    if(inputFile){
        let file = inputFile[0].files[0];
        prato.image = file.path;
    }
    ipcRenderer.send('salva-prato', prato);
}

