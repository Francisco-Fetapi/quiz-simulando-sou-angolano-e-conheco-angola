<?php
    require 'class_quiz.php';
    $sugeridas = $Quiz->perguntas_sugeridas();

    function reescreve($valor,$alt){
        if(stripos($valor,'(certa)')>0){
            return "<span class='text-success'>$alt: ". str_replace('(certa)','',$valor) ."</span>";
        }else{
            return "<span class='text-danger'>$alt: $valor</span>";
        }
    }

    while($sugerida = $sugeridas->fetch_object()){
        $altA = reescreve($sugerida->A,'A');
        $altB = reescreve($sugerida->B,'B');
        $altC = reescreve($sugerida->C,'C');
        $altD = reescreve($sugerida->D,'D');

        if($sugerida->origem == 2){
            $class = 'bg-danger';
        }else{
            $class = 'bg-warning';
        }
        echo "
        <tr>
            <td>$sugerida->pergunta</td>
            <td class='td_alts'>
               $altA 
               $altB 
               $altC
               $altD
            </td>
            <td style='text-align: center;'><span class='bloco $class' data-id='$sugerida->id' data-estado='$sugerida->origem'></span></td>
        </tr>
        ";
    }

?>