<?php
    require 'class_quiz.php';
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    $Quiz->login($nome,$senha);
?>