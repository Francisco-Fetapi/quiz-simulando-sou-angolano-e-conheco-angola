# Quiz - Simulando o Sou Angolano e Conheço Angola

Este é um projeto criado nos `meados de 2020` para exercitar o `PHP`, principlamente assuntos ligados a `arquitetura e POO`, hoje percebo que na época eu não entendia absolutamente NADA sobre nem um nem outro, é só ver o quanto a arquitetura e o código do projeto estão SUJOS😅, apesar de tudo não tenciono alterar nenhuma linha de código desse projeto, foram os meus primeiros passos na linguagem `PHP` e não quero apagá-los, quero puder vê-los e me divertir com isso sempre que quiser. "VER" A MINHA PRÓPRIA EVOLUÇÃO É FASCINANTE.❤

# Motivação

Este foi o meu primeiro projeto com `PHP`, lembro que em `janeiro de 2020` eu estava focado demais no `front-end` até que comecei a sentir a necessidade de realizar operações que necessitavam de um servidor, foi ai que decidi estudar o `PHP`. Depois de meses de estudo e exercicios, decidi criar um projeto mais desafiador do que um simples `CRUD` ou um `sistema de login` e foi assim que surgiu esse projeto. Ele foi inspirado no famoso `Quem quer ser rico` e no `Sou angolano e conheço angola`, algumas imagens e perguntas foram daí extraidos.😊

# Pré-requisitos para rodar o sistema localmente
Por ser um projeto de estudo não me preocupei em hospedá-lo, mas caso queiras ver o projeto rodando, eis abaixo alguns elementos que precisas ter instalado em sua máquina.

1. Servidor APACHE e MySQL (para instalar podes usar o XAMPP ou aplicativos similares)
2. Algum Navegador (Óbvio😅)

# Passos para rodar o projeto localmente

Com essas ferramentas instaladas o próximo passo é clonar o repositório:
```
git clone https://github.com/Francisco-Fetapi/quiz-simulando-sou-angolano-e-conheco-angola.git
```

Com o repositório clonado basta apenas importar o banco de dados com suas respetivas tabelas no seu _gestor de banco de dados_, no exemplo a seguir estarei usando o **PHPMyAdmin**

![importando_bd](https://user-images.githubusercontent.com/74926014/175775785-c8792c9a-6d77-425d-b222-292519af9954.PNG)

Ao acessar o painel para importar um __banco de dados__ deve-se escolher o arquivo com as instruções a serem executadas para criar o banco. 
Na raiz do projeto clonado temos o arquivo `#banco_de_dados/quiz.sql`, é ele que contém todo o SQL que deve ser executado para criar o banco de dados e suas respetivas tabelas.

Quase que ia me esquecendo: O projeto clonado deve ser movido para a pasta onde o endereço `http://localhost` aponta, no meu caso, já que estou usando o `XAMPP` o endereço é `C:\xampp\htdocs`. Depois da pasta ser movida para o local designado no passo anterior, ao acessar `http://localhost/quiz-simulando-sou-angolano-e-conheco-angola` acessaremos o sistema, como se segue nas imagens abaixo:


![asset1](https://user-images.githubusercontent.com/74926014/175778212-2c130eb7-000b-4e9a-b620-4fc9b8ac8d1e.PNG)
![asset2](https://user-images.githubusercontent.com/74926014/175778241-6c5ef948-5702-4872-ae0d-cf985421a76b.PNG)
![asset3](https://user-images.githubusercontent.com/74926014/175778257-63262ec5-a357-41d4-b2e4-042bd2ac201d.PNG)
![asset4](https://user-images.githubusercontent.com/74926014/175778263-0debab5c-8df7-4873-a10c-a1d62ea4c85d.PNG)


##

Se seguiu todos os passos acima já pode acessar o site <a href="http://localhost/quiz-simulando-sou-angolano-e-conheco-angola">clicando aqui</a>
