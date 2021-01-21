<?php
    require 'class_quiz.php';
    $pts_a_aumentar = $_POST['pontos'];
    $id_usuario = $_COOKIE['id_sessao'];
    $Quiz->aumentar_pontos($id_usuario,$pts_a_aumentar);
?>