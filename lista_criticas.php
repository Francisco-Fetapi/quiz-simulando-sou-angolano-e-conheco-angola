<?php 

    require 'class_quiz.php';
    $criticas = $Quiz->criticas();

    while($critica = $criticas->fetch_object()){
        $critic = str_replace("\n","\n<br>",$critica->critica);
        if(trim($critica->critica) != ''){
            echo "
            <div class='critica'>
                <span>$critica->nome</span>
                <p>$critic</p>
            </div>";
        }
    }
?>