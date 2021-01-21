$(function(){
    window.localStorage.setItem('nivel','1');
    window.localStorage.setItem('pontos','0');

    localStorage.setItem('p_ligar','nao');
    localStorage.setItem('p_pular','nao');
    localStorage.setItem('p_para_2','nao');
    localStorage.setItem('p_publico','nao');

    $(window).resize(function(){
        console.log(window.innerWidth);
    })

    var nome_do_som = $('#nome_som').val();
    var som_clique_url = './audios/clique.mp3';
    var som_ao_iniciar = new Audio(`./audios/${nome_do_som}`);
    var som_clique = new Audio(som_clique_url);
    var som_erro = new Audio('./audios/erro.mp3');
    
       if(!window.localStorage.getItem('vol')){
            window.localStorage.setItem('vol','1');
       }
    setInterval(()=>{
        som_ao_iniciar.volume = +window.localStorage.getItem('vol');
    },10);

    function som_inicia(n){
		setTimeout(()=>{
            som_ao_iniciar.play();
		},n*1000);
    }
    som_inicia(1);
    som_ao_iniciar.onended = function(){
        som_inicia(0.1);
    }

    $("button,[type='submit'],.btn,.botao").click(function(){
        som_clique.volume = 0.5;
        som_clique.play();
    });


    var btnNovoJogo = $('button:contains(Novo)');
    var btnRelogio = $('button:contains(relógio)');
    var btnRanking = $('button:contains(Ranking)');
    var btnSugerir = $('button:contains(Sugerir)');
    var btnConfig = $('button:contains(Config)');
    var btnSobre = $('button:contains(Sobre)');
    var btnLogin = $('button:contains(Login)');
    var btnLogout = $('button:contains(Logout)');

    var modal = $('#modal');
    var modal2 = $('#modal2');
    var modal3 = $('#modal3');

    btnNovoJogo.click(function(){
        $.post('txt_critica.php','',function(response){
            if(response == 'L'){ //nao esta logado
                abrirModal3("Login requerido");
            }else{
                window.location.href = "comecar_round.html?nivel=1";
            }
        })
    });
    btnRelogio.click(function(){
        $.post('txt_critica.php','',function(response){
            if(response == 'L'){ //nao esta logado
                abrirModal3("Login requerido");
            }else{
                window.location.href = "comecar_round.html?relogio=sim&nivel=1";
            }
        })
    })
    btnRanking.click(function(){
        abrirModal({titulo:'Ranking',view:'ranking'});
        modal.modal('show');
    });
    btnSugerir.click(function(){
        //uma forma de testar se o usuario esta logado! meio idiota,mas funciona! : )
        $.post('txt_critica.php','',function(response){
            if(response == 'L'){ //nao esta logado
                abrirModal2('Iniciar sessao','Para sugerires perguntas ao ADM precisas estar logado. <br> Desejas se logar agora?',function(r){
                    if(r== true){
                        modal2.modal('hide');
                        btnLogin.click();                        
                    }else{
                        modal2.modal('hide');
                    }
                })   
            }else{
                abrirModal({titulo:'Sugerir Pergunta',view:'sugerir'});
                modal.modal('show');
            }
        });
    });
    btnLogin.click(function(){
        abrirModal({titulo:'Iniciar Sessao',view:'login',width:'65%'});
        modal.modal('show');
    });
    btnSobre.click(function(){
        abrirModal({titulo:'Sobre',view:'sobre'});
        modal.modal('show');
    });
    btnConfig.click(function(){
        abrirModal({titulo:'Configuracoes',view:'config',width:'70%'});
        modal.modal('show');
    });
    btnLogout.click(function(){
        abrirModal2('Terminar Sessao',"Tem certeza que quer terminar esta sessão?",function(resposta){
            if(resposta == true){
                $.get('logout.php',function(){
                    window.location.reload();
                });
            }else{
                modal2.modal('hide');
            }
        })
    });

    function abrirModal2(titulo,conteudo,func){
        modal2.find('.modal-header').html('<h2>'+titulo+'</h2>');
        modal2.find('.modal-body').html(conteudo);

        modal2.find('.btn-success').click(function(){
            func(true);
        });
        modal2.find('.btn-danger').click(function(){
            func(false);
        });
        modal2.modal('show');
    }

    $('[data-toggle]').tooltip({
        placement:'bottom',
        trigger:'hover',
        html:true,
        delay:{show:200,hide:800}
    })

    function abrirModal(obj){
        modal.find('.modal-header').html(`<h2>${obj.titulo}</h2>`);
        if(obj.width != undefined){
            modal.find('.modal-content').css('width',obj.width);
        }else{
            modal.find('.modal-content').css('width','auto');
        }
        obterModalBodyDe(obj.view);
    }
    
    function obterModalBodyDe(view){
        $.post('views/modais/'+'modal-'+view+".html",function(dados){
            modal.find('.modal-body').html(dados);
        })
    }
    function abrirModal3(msg){
        modal3.find('.modal-body').html(msg);
        modal3.modal('show');
        som_erro.volume = 0.25;
        som_erro.play();
        setTimeout(()=>{
            modal3.modal('hide');
        },1300)
    }

})