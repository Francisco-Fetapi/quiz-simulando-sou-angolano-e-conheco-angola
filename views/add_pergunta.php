<div id="add_per">
    <h2 class="h">Adicionar Pergunta</h2>
    <form action="adicionar_pergunta.php" method="post" id="form_add">
        <p>
            <span class="txt">Nivel:</span> <select name="nivel" class="form-control">
                <option value="1">Fácil</option>
                <option value="2">Normal</option>
                <option value="3">Difícil</option>
            </select>
        </p>
        <p>
            <span class="txt">Pergunta:</span>
            <textarea name="pergunta" class="form-control" rows="3" required></textarea>
        </p>
        <div style="display: grid;grid-template: 'a b' auto/48% 48%;gap:2px;">
            <p>A: <input type="text" name="alternativa[A]" class="form-control" required></p>
            <p>B: <input type="text" name="alternativa[B]" class="form-control" required></p>
            <p>C: <input type="text" name="alternativa[C]" class="form-control" required></p>
            <p>D: <input type="text" name="alternativa[D]" class="form-control" required></p>
            <p>Certa:
                <select name="alternativa[certa]" class="form-control" placeholder="Apenas a letra (A,B,C ou D)">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </p>
            <p><br> <button class="btn btn-info">Enviar</button></p>
        </div>
        <input type="hidden" name="quem" value="admin">
    </form>
</div>
<div id="sug">
    <h2 class="h">Perguntas Sugeridas</h2>
    <table class="table table-bordered" id="tabela-sugest">
        <thead>
            <tr>
                <th>Pergunta</th>
                <th>Alternativas</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="tbody-sugestoes">
            <tr>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequuntueprehenderit</td>
                <td>
                    <span class="text-danger">A: Linha A<br></span>
                    <span class="text-danger">B: Linha B<br></span>
                    <span class="text-success">C: Linha C<br></span>
                    <span class="text-danger">D: Linha D</span>
                </td>
                <td style="text-align: center;"><span class="bloco bg-danger"></span></td>
            </tr>
        </tbody>
    </table>
</div>

<script>
$(function() {
    $('#form_add').submit(function(event) {
        event.preventDefault();

        $.post($(this).attr('action'), $(this).serialize(), function(response) {
            console.log(response);
            window.location.reload();
        });
    });
    $.post('listar_perg_sugeridas.php', '', function(r) {
        $('#tbody-sugestoes').html(r);
        // console.log(r);
        $('.bloco').click(function() {
            $(this).toggleClass('bg-danger');
            $(this).toggleClass('bg-warning');
            var info = {
                estado: $(this).attr('data-estado'),
                id: $(this).attr('data-id')
            };

            $.post('mudar_estado_sugerida.php', info, function(res) {
                console.log(res);
            })
            // console.log(id, estado);
        })
    });
})
</script>