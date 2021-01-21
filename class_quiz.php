<?php
    session_start();
    class pergunta{
        public $pergunta,$altern,$nivel,$origem;

        function __construct($p,$a,$n,$o){
            $this->pergunta = $p;
            $this->altern = $a;
            $this->nivel = $n;
            $this->origem = $o;
        }
    }
    class usuario{
        public $id,$nome,$senha,$pontos;
        function __construct($id,$nome,$senha,$pontos){
            $this->id = $id;
            $this->nome = $nome;
            $this->senha = $senha;
            $this->pontos = $pontos;
        }
    }

    class Quiz{
        public $bd,$usuario;

        function __construct($host,$user,$senha,$banco){
            $this->bd = new mysqli($host,$user,$senha,$banco);
        }
        function add_pergunta($obj){
            $perg = $obj->pergunta;
            $altern = $obj->altern;
            $nivel = $obj->nivel;
            $origem = $obj->origem;

            if($origem == 'admin'){
                $origem = '1';
            }else{
                $origem = '2';
            }
            $letra_resp_certa = $altern['certa'];
            $altern[$letra_resp_certa] .= "(certa)";

            $sql = "INSERT INTO perguntas (pergunta,A,B,C,D,resposta_certa,nivel,origem) VAlUES(
                '$perg',
                '$altern[A]',
                '$altern[B]',
                '$altern[C]',
                '$altern[D]',
                '$altern[certa]',
                '$nivel',
                '$origem')";
            if($this->bd->query($sql)){
                echo "Pergunta Cadastrada";
            }else{
                echo "Ocorreu um erro";
            }
        }
        function login($nome,$senha){
            if($nome == 'admin' && $senha == 'admin'){
                header('location: painel_admin.html');
            }else{
                $sql = "SELECT * FROM usuario WHERE nome='$nome' AND senha='$senha'";
                $r = $this->bd->query($sql);
                if($r->num_rows == 0){ //nao existe
                   $sql = "INSERT INTO usuario (nome,senha,pontos) VALUES ('$nome','$senha','0')";
                   $this->bd->query($sql);
                   $sql = "SELECT id FROM usuario WHERE nome='$nome' AND senha='$senha'";
                   $dados_user = ($this->bd->query($sql))->fetch_object();
                   echo "0";
                   $this->iniciar_sessao($dados_user->id);
                   
                   $this->bd->query("INSERT INTO configuracoes (de) VALUES('$dados_user->id')");
                }else{ //existe
                    $user = $r->fetch_object();
                    $this->iniciar_sessao($user->id);
                    echo "1";
                }
            }
            
        }
        function iniciar_sessao($id_usuario){
            $sql = "SELECT * FROM usuario WHERE id='$id_usuario'";
            $r = $this->bd->query($sql);

            $usuario = $r->fetch_object();
            //inicio e armazenamento da sessao
            
            $_SESSION['id'] = $usuario->id;
            //armazenamento do id da sessao no cookie
            $tempo = time() + 60*60*24*30;
            setcookie('id_sessao',$_SESSION['id'],$tempo);
            //armazenar na propriedade usuario todos os dados do user atual
            $this->usuario = new usuario($usuario->id,$usuario->nome,$usuario->senha,$usuario->pontos);
        }
        function terminar_sessao(){
            setcookie('id_sessao','',0);
            $this->usuario = false;
        }
        function criticar($id_usuario,$texto){
            $sql = "UPDATE usuario SET critica='$texto' WHERE id='$id_usuario'";
            $this->bd->query($sql);
            echo $texto;
        }
        function obter_critica($id_usuario){
            $sql = "SELECT critica FROM usuario WHERE id='$id_usuario'";
            $txt = ($this->bd->query($sql))->fetch_object();
            return $txt->critica;
        }
        function listar_ranking(){
            $sql = "SELECT * FROM usuario ORDER BY pontos DESC";
            $usuarios = $this->bd->query($sql);
            return $usuarios;
        }
        function criticas(){
            $sql = "SELECT nome,critica FROM usuario";
            $criticas = $this->bd->query($sql);
            return $criticas;
        }
        function perguntas_sugeridas(){
            $sql = "SELECT * FROM perguntas WHERE origem='2' OR origem='3'";
            $pergs = $this->bd->query($sql);
            return $pergs;
        }
        function obter_configs($id_usuario){
            $sql = "SELECT som_ao_iniciar,som_durante_jogo FROM configuracoes WHERE de='$id_usuario'";
            $res = ($this->bd->query($sql))->fetch_object();
            if($res->som_ao_iniciar!='') return $res;
            else return $this->obter_config_padrao();
        }
        function obter_config_padrao(){
            $sql = "SELECT * FROM configuracoes WHERE de = '0'";
            $res = $this->bd->query($sql);
            return $res->fetch_object();
        }
        function mudar_musica_inicio($id_usuario,$musica){
            $nome_musica = "som_$id_usuario.mp3";
            $endereco = "audios/$nome_musica";
            if(move_uploaded_file($musica,$endereco)){
                $sql = "UPDATE configuracoes SET som_ao_iniciar='$nome_musica' WHERE de='$id_usuario'";
                $this->bd->query($sql);
                echo "Musica salva";
            }else{
                echo "Erro";
            }
        }
        function obter_perguntas($nivel){
            $sql = "SELECT * FROM perguntas WHERE nivel='$nivel' AND origem<>2";
            $res = $this->bd->query($sql);
            $res_em_array = [];
            while($perg = $res->fetch_object()){
                array_push($res_em_array,$perg);
            }
            return $res_em_array;
        }
        function aumentar_pontos($id_usuario,$pts){
            $sql = "SELECT pontos FROM usuario WHERE id='$id_usuario'";
            $usuario = ($this->bd->query($sql))->fetch_object();
            $pontos = $usuario->pontos;
            $pontos+=$pts;
            $sql = "UPDATE usuario SET pontos = '$pontos' WHERE id='$id_usuario'";
            $this->bd->query($sql);
            echo $pontos;
        }
        function mudar_estado_sugerida($id,$estado){
            $sql = "SELECT origem FROM perguntas WHERE id='$id'";
            $pergunta = ($this->bd->query($sql))->fetch_object();
            $estado_atual = $pergunta->origem;
            $proximo_estado = 0;
            if($estado_atual == 2){
                $proximo_estado = 3;
            }else{
                $proximo_estado = 2;
            }
            $sql = "UPDATE perguntas SET origem='$proximo_estado' WHERE id='$id'";
            $this->bd->query($sql);
        }
    }
    $Quiz = new Quiz('localhost','root','','quiz');
    // $Quiz = new Quiz('sql212.epizy.com','epiz_27728848','wO4bhXBCaKm','epiz_27728848_quiz');

?>