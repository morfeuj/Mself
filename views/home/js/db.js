const admin = require('firebase-admin');
let serviceAccountKey = require('../../admin/config.json');

admin.initializeApp({
    credential : admin.credential.cert(serviceAccountKey),
    databaseURL : 'https://mself-1243c.firebaseio.com/',
    storageBucket : 'gs://mself-1243c.appspot.com'
});

let bdRef = admin.database().ref('/prato');

bdRef.on('child_added', function(snapshot) {
    $('#lista').append(cria_cartao(snapshot));
});
  
bdRef.on('child_changed', function(snapshot) {
    $('#lista').append(cria_cartao(snapshot));
});

function cria_cartao(snapshot){
    
    let img     = $('<img>').addClass('card-img-top').attr('src', snapshot.val().image);
    let col1    = $('<div></div>').addClass('col-sm').append(img);

    let h3      = $('<h3></h3>').addClass('card-title').text(snapshot.val().titulo);
    let p       = $('<p></p>').addClass('card-text').text(snapshot.val().descricao);
    let preco   = $('<p></p>').addClass('card-text text-danger').text('R$ ' + snapshot.val().preco);
    let body    = $('<div></div>').addClass('card-body').append(h3, p, preco);

    let col2    = $('<div></div>').addClass('col-sm').append(body);
    
    let row1     = $('<div></div>').addClass('row').append(col1, col2);
    let card    = $('<div></div>').addClass('card').append(row1).attr('id', snapshot.key);

    return card;
}

bdRef.on('child_removed', function(data) {
});


