<?php
    require 'class_quiz.php';
    $nivel = $_POST['nivel'];
    $perguntas = $Quiz->obter_perguntas($nivel);

    echo json_encode($perguntas);
?>