<?php
    require 'class_quiz.php';
    $perg = $_POST['pergunta'];
    $nivel = $_POST['nivel'];
    $alt = $_POST['alternativa'];
    $origem = $_POST['quem'];

    $pergunta = new pergunta($perg,$alt,$nivel,$origem);
    $Quiz->add_pergunta($pergunta,$origem);

?>