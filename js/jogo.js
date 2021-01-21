$(function(){
    var som_errado = new Audio('./audios/errado.mp3');
    var som_certo = new Audio('./audios/certo.mp3');
    var fala_errada = new Audio('./audios/resp_errada.mp3');
    var fala_certa = new Audio('./audios/resp_certa.mp3');
    var som_moeda = new Audio('./audios/dinheiro.mp3');
    var som_espera_resp = new Audio('./audios/toque_bt.mp3');
    var som_aplausos = new Audio('./audios/aplausos.mp3');

    var modalCerteza = $('#modal_certeza');

    var perguntas_nivel = [];
    var desc_perg = $('#p p');
    var alterns = $('.alterns');
    var nivel = window.localStorage.getItem('nivel');
    var pontos = window.localStorage.getItem('pontos');

    var publico = $('#pp li:eq(0)');
    var ligar = $('#pp li:eq(1)');
    var pular = $("#pp li:eq(2)");
    var para_2 = $('#pp li:eq(3)');

    var perguntas_por_nivel = 3;

    $('#pontosAtual').html(pontos+" pt");


    function obter_perg(nivel,func){
        $.post('obter_perguntas.php','nivel='+nivel,func,'json');
    }
    if(nivel == 1){
        obter_perg(1,function(r){
            localStorage.setItem('perguntas',JSON.stringify(r));
            window.localStorage.setItem('pts_a_aumentar','50');
            geraPerguntas();
            $('#ronda').html("Primeira Ronda");
        });
    }else if(nivel == 2){
        obter_perg(2,function(r){
            localStorage.setItem('perguntas',JSON.stringify(r));
            window.localStorage.setItem('pts_a_aumentar','100');
            geraPerguntas();
            $('#ronda').html("Segunda Ronda");
        });
    }else{
        obter_perg(3,function(r){
            localStorage.setItem('perguntas',JSON.stringify(r));
            window.localStorage.setItem('pts_a_aumentar','200');
            geraPerguntas();
            $('#ronda').html("Terceira Ronda");
        });
    }
    function modoRelogioAtivo(){
        var r = localStorage.getItem('relogio');
        if(r == 'sim') return true;
        else return false;
    }

    function mostrarRelogio(){
        if(modoRelogioAtivo()){
            iniciarContagemRelogio();
        }
    }
    function tempo_terminou(){
        abrirModal("O tempo se esgotou");
        setTimeout(()=>{
            window.history.back();
        },2000)
    }
    var contagem_relogio;
    function iniciarContagemRelogio(){
        $('#barra').css('display','block');
        var barra = $('#barra div');
        var n = $('#barra span');
        var tempo = +n.text().match(/\d+/)[0];

        if(tempo == '20'){
            var width = barra.css('width').match(/\d+/g)[0];
            var d = 100;
            contagem_relogio = setInterval(()=>{
                n.text(--tempo+"s");
                d -= 5; 
                barra.css('width',d+"%");
                if(!tempo){
                    clearInterval(contagem_relogio);
                    tempo_terminou();
                }
            },1000);
        }else{ //reiniciar primeiro , funcao recursiva
            clearInterval(contagem_relogio);
            tempo = 20;
            n.html(tempo);
            barra.css('width','100%');
            iniciarContagemRelogio();
        }
    }
    function abrirModal(res){
        if(typeof res == "boolean"){
            if(res == true){
                modalCerteza.find('.modal-body').html('Resposta certa').removeClass('bg-success bg-danger').addClass('bg-success');
            }else{
                modalCerteza.find('.modal-body').html('Resposta errada').removeClass('bg-success bg-danger').addClass('bg-danger');
            }
            setTimeout(() => {
                modalCerteza.modal('hide');
            },2000);
        }else if(typeof res == 'string'){
            modalCerteza.find('.modal-body').html(res).removeClass('bg-success bg-danger').addClass('bg-dark');
        }
        modalCerteza.modal('show');
        
    }
    function geraPerguntas(){
        perguntas_iniciais = JSON.parse(localStorage.getItem('perguntas'));
        
        for(c = 0;c<perguntas_por_nivel;c++){            
            while(true){
                ind_alea = Math.round(Math.random()*perguntas_iniciais.length);
                elem_alea = perguntas_iniciais[ind_alea];
                if(elem_alea == undefined) continue;

                if(perguntas_nivel.indexOf(elem_alea) == -1){ //se nao existe
                    perguntas_nivel.push(elem_alea);
                    break;
                }
            }
        }
        localStorage.setItem('p',JSON.stringify(perguntas_nivel));
        proxima_pergunta();
    }
    function geraIndice(){
        indice_gerado = Math.floor(Math.random()*perguntas_nivel.length-1);
        if(indice_gerado==-1) indice_gerado = 0;
        return indice_gerado;
    }
    function proxima_pergunta(){
        
        const ind = geraIndice();
        desc_perg.html(perguntas_nivel[ind].pergunta);
        alterns.html('');
        alterns.append(`<li><span>A</span> ${perguntas_nivel[ind].A}</li>`)
        alterns.append(`<li><span>B</span> ${perguntas_nivel[ind].B}</li>`)
        alterns.append(`<li><span>C</span> ${perguntas_nivel[ind].C}</li>`)
        alterns.append(`<li><span>D</span> ${perguntas_nivel[ind].D}</li>`)


        alterns.find('li').each(function(){
            var txt = $(this).html();
            if(txt.includes('(certa)')){
                txt = txt.replace('(certa)','');
                $(this).html(txt);
                $(this).data('certa','sim');
            }
            $(this).data('nivel',`${perguntas_nivel[ind].nivel}`);
        });

        alterns.find('li').bind('click',function(){
            alterns.find('li').removeClass('bg-warning');
            var alter = $(this);
            alter.addClass('bg-warning');

            if(localStorage.getItem('confirmar')=='sim'){
                var resp = window.confirm('Tem certeza?');
                if(resp){
                    decide();
                }else{
                    alter.removeClass('bg-warning');  
                }
            }else{
                decide();
            }
            function decide(){
                clearInterval(contagem_relogio);
                alterns.find('li').unbind();
                som_espera_resp.play();
                var int = setInterval(()=>{
                    som_espera_resp.play();
                },700);
                setTimeout(()=>{
                    clearInterval(int);
                    alter.removeClass('bg-danger bg-success bg-warning');
                    if(alter.data('certa')){
                        alter.addClass('bg-success');
                        acertou();
                    }else{
                        alter.addClass('bg-danger');
                       errou();
                    }
                },2000);
            }
        });
        perguntas_nivel.splice(indice_gerado,1);
        mostrarRelogio(); //se existe, comeca a contar

        // if(desc_perg.html().includes('Lorem')){ //se houve um erro
        //     window.location.reload();
        // }
    }
    function incrementaPontosNoBanco(pts){
        $.post('atualizar_pontos.php','pontos='+pts,function(res){
            console.log(res);
          });
    }
    function incrementaPontos(valor){
        som_moeda.play();
        var divPontos = $('#pontosAtual');
        var ptsAtual = +divPontos.html().match(/\d+/)[0];
        ptsAtual+= valor;
        incrementaPontosNoBanco(ptsAtual);
        divPontos.html(ptsAtual+" pt");
    }
    function acertou(){
        som_certo.play();
        setTimeout(()=>{
            abrirModal(true);
            fala_certa.play();
        },400);
        setTimeout(()=>{
            var pts_a_aumentar = localStorage.getItem('pts_a_aumentar')
            incrementaPontos(+pts_a_aumentar);
        },1800);
        if(perguntas_nivel.length!=0){
            setTimeout(()=>{
                proxima_pergunta();
            },2500);
        }else{
            // As perguntas terminaram
            som_aplausos.play();
            novoNivel = +nivel+1;
            if(novoNivel == 4){ //entao nao resta mais niveis! fim do ultimo nivel -- 3
               setTimeout(()=>{
                    $('body').load('final.html');
                    if($('#barra').css('display')=='none'){ //modo normal
                        localStorage.setItem('relogio','nao')
                        incrementaPontosNoBanco(5000);
                    }else{ //modo relogio
                        localStorage.setItem('relogio','sim')
                        incrementaPontosNoBanco(10000);
                    }
                    window.localStorage.setItem('nivel','1'); //recomecar no nivel 1
                    window.localStorage.setItem('pontos','0'); //reiniciar pontos
               },6000);
            }else{
                setTimeout(()=>{
                    abrirModal("Ir para a próxima ronda!");
                },3500);
                window.localStorage.setItem('nivel',novoNivel);
                setTimeout(()=>{
                    var pts = $('#pontosAtual').html().match(/\d+/)[0];
                    localStorage.setItem('pontos',pts);
                    if(modoRelogioAtivo()){
                        window.location.replace("comecar_round.html?nivel="+novoNivel+"&pontos="+pts+"&relogio=sim");
                    }else{
                        window.location.replace("comecar_round.html?nivel="+novoNivel+"&pontos="+pts);
                    }
                },7000);
            }
            console.log('As perguntas terminaram');
        }
    }
    function marcar_res_certa(){
        var alterns = $('.alterns li');
        alterns.each(function(){
            if($(this).data('certa')=='sim') $(this).addClass('bg-success');
        });
    }
    function errou(){
        abrirModal(false);
        marcar_res_certa();
        setTimeout(()=>{
            if(window.history.back()); //se da para voltar
            else window.location.replace('index.php');
        },2400);
        som_errado.play();
        fala_errada.play();
    }

    //setar dados do localStorage visualmente
    var p_ligado = localStorage.getItem('p_ligar');
    var p_publico = localStorage.getItem('p_publico');
    var p_para_2 = localStorage.getItem('p_para_2');
    var p_pular = localStorage.getItem('p_pular');

    if(p_ligado == 'sim') ligar.addClass('clicado');
    if(p_publico == 'sim') publico.addClass('clicado');
    if(p_para_2 == 'sim') para_2.addClass('clicado');
    if(p_pular == 'sim') pular.addClass('clicado');

    pular.click(function(){
        if(!$(this).hasClass('clicado')){
            proxima_pergunta();
            $(this).addClass('clicado');
            localStorage.setItem('p_pular','sim');
        }
    });
    para_2.click(function(){
        if(!$(this).hasClass('clicado')){
            pergs = $('.alterns li');
            indice_valido = Math.round(Math.random()*1);
            perguntas = 0;
            pergs.each(function(ind){
                if($(this).data('certa')!='sim' && perguntas<2){
                    $(this).addClass('resp_errada');
                    if(perguntas == 0){
                        $(this).addClass('esq');
                    }else{
                        $(this).addClass('dir');
                    }
                    perguntas++;
                }
            });
            $(this).addClass('clicado');
            localStorage.setItem('p_para_2','sim');
        }
    });
    publico.click(function(){
        if(!$(this).hasClass('clicado')){
            pergs = $('.alterns li');
            var possibilidades = [[57,3,24,16],[77,12,8,3],[48,22,23,5],[89,3,7,1]];
            var ind_aleator = Math.round(Math.random()*3);
            pergs.each(function(ind){
                if($(this).data('certa')=='sim'){
                    $(this).append(`<span class='perc bg-success'>${possibilidades[ind_aleator][0]}% </span>`);
                }else{
                    if(ind == 0){
                        $(this).append(`<span class='perc'>${possibilidades[ind_aleator][ind+1]}% </span>`);
                    }else{
                        $(this).append(`<span class='perc'>${possibilidades[ind_aleator][ind]}% </span>`);
                    }
                }
            });
            $(this).addClass('clicado');
            localStorage.setItem('p_publico','sim');
        }
    });
    ligar.click(function(){
        if(!$(this).hasClass('clicado')){
            modal = $('#modal2');
            modal.modal('show');
            modal.find('.list-group-item').click(function(){
                texto = $(this).attr('data-res');
                alter_certa = '';

                $('.alterns li').each(function(){
                    if($(this).data('certa')=='sim'){
                        alter_certa = $(this).find('span').text();
                    }
                });
                texto += "<b>"+alter_certa+"</b>";
                modal.find('.modal-body').html(`<span class='aa'>${texto}</span>`);
            });
            $(this).addClass('clicado');
            localStorage.setItem('p_ligar','sim');
        }
    });
});