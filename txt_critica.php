<?php
    require 'class_quiz.php';
    if(isset($_COOKIE['id_sessao'])){
        $id_usuario = $_COOKIE['id_sessao'];
        $critica = $Quiz->obter_critica($id_usuario);
        echo $critica;
    }else{
        echo "L";
    }
?>