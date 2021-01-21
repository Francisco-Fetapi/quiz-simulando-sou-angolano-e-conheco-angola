<?php

    require 'class_quiz.php';
    $usuarios = $Quiz->listar_ranking();
    $pos = 1;
    while($usuario = $usuarios->fetch_object()){
        echo "<tr>
            <td>$pos</td>
            <td>$usuario->nome</td>
            <td>$usuario->pontos</td>
        </tr>";
        $pos++;
    }

?>