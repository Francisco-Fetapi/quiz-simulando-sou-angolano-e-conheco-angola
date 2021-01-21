<?php
    require 'class_quiz.php';
    $id_usuario = $_COOKIE['id_sessao'];
    $nova_musica = $_FILES['musica']['tmp_name'];
    $Quiz->mudar_musica_inicio($id_usuario,$nova_musica);
    header("Location: index.php");
?>