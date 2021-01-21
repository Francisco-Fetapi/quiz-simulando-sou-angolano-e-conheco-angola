<?php
    require 'class_quiz.php';
    $id = $_POST['id'];
    $estado = $_POST['estado'];
    
    $Quiz->mudar_estado_sugerida($id,$estado);
    echo "$id  $estado";
?>