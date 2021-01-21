<?php
    require 'class_quiz.php';
    $texto = $_POST['texto'];
    if(isset($texto)){
        $id_usuario = $_COOKIE['id_sessao'];
        $Quiz->criticar($id_usuario,$texto);
    }
?>