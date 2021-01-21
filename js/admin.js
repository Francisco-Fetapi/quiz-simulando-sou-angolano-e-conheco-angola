$(function(){

    var divAddPerg = $('#add_perg');
    var ranking = $('#ranking');
    var config = $('#config');
    var criticas = $('#criticas');

    $.get('views/add_pergunta.php',function(dados){
       divAddPerg.html(dados);
    });
    $.get('views/modais/modal-ranking.html',function(dados){
        ranking.html(dados);
    });
    $.get('views/criticas.html',function(dados){
        criticas.html(dados);
    })
});