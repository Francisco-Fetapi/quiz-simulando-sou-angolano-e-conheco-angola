<?php 
    require "class_quiz.php";
    if(isset($_COOKIE['id_sessao'])){
        $Quiz->iniciar_sessao($_COOKIE['id_sessao']);
        $usuario = $Quiz->usuario;
    }
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="shortcut icon" href="img/ic_new_game.png" type="image/x-icon">
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/index.css">
    <script>
    (new Audio(`./audios/clique.mp3`));
    (new Audio('./audios/erro.mp3'));
    </script>
</head>

<body>
    <header class="centra">
        <div id="logo">
            <span class="t">Quem</span>
            <span class="glyphicon glyphicon-question-sign"></span>
            <span class="t">sabe</span>
            <div id="pts">
                <?php if(isset($usuario)){ ?>
                <span id="pt" data-toggle="tooltip"
                    title="pontos de <?php echo "<b>$usuario->nome<b>" ?>"><?php echo "$usuario->pontos pt" ?> </span>
                <?php }else{ ?>
                <span style="display:inline-block;" class='text-danger'>0
                </span>
                <?php } ?>
            </div>
        </div>

        <div id="botoes" class="centra">
            <button class="btn btn-success"><span class="glyphicon glyphicon-question-sign"></span> Novo jogo</button>
            <button class="btn btn-success"><span class="glyphicon glyphicon-time"></span> Contra-relógio</button>
            <button class="btn btn-success"><span class="glyphicon glyphicon-sort"></span> Ranking</button>
            <button class="btn btn-success"><span class="glyphicon glyphicon-plus-sign"></span> Sugerir <abbr
                    title="perguntas">perg.</abbr< /button>
                    <button class="btn btn-success"><span class="glyphicon glyphicon-cog"></span> Configurações</button>
                    <button class="btn btn-success"><span class="glyphicon glyphicon-info-sign"></span> Sobre</button>
                    <?php if(!isset($usuario)){ ?>
                    <button class="btn btn-success"><span class="glyphicon glyphicon-log-in"></span> Login</button>
                    <?php }else{ ?>
                    <button class="btn btn-success"><span class="glyphicon glyphicon-log-out"></span> Logout</button>
                    <?php } ?>
        </div>
    </header>


    <div class="modal fade" id="modal">
        <div class="modal-dialog">
            <div class="modal-content centra">
                <div class="modal-header">

                </div>
                <div class="modal-body">

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal2">
        <div class="modal-dialog">
            <div class="modal-content centra">
                <div class="modal-header">

                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button class="btn btn-success">Sim</button>
                    <button class="btn btn-danger">Não</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal3">
        <div class="modal-dialog">
            <div class="modal-content centra">
                <div class="modal-body bg-danger">

                </div>
            </div>
        </div>
    </div>

    <?php
        $id_usuario = 0;
        if(isset($_COOKIE['id_sessao'])){
            $Quiz->iniciar_sessao($_COOKIE['id_sessao']);
            $id_usuario = $Quiz->usuario->id;
        }
        $configs = $Quiz->obter_configs($id_usuario);
        echo "<input type='hidden' id='nome_som' value='$configs->som_ao_iniciar'/>";
    ?>

    <script src="js/jquery.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/index.js"></script>
</body>

</html>