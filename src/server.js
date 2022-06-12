const express = require('express');
const clientBase = require('./bd');
const app = express();
const port = process.env.PORT || 5000;


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/', async (req, res) => {
    const resultSelect = await clientBase.query(`SELECT * FROM alunos ORDER BY id`);

    res.render('page/index', { alunos: resultSelect.rows });
});

app.get('/incluir-aluno', (req, res) => {
    res.render('page/incluir-aluno', { result: '' });
});

app.post('/incluir-aluno', async (req, res) => {

    const resultInsert = await clientBase.query(`INSERT INTO alunos (nome, sobrenome, endereco) VALUES($1, $2, $3) RETURNING *`, 
        [req.body.nome, req.body.sobrenome, req.body.endereco]);
    const result = { result: { success: resultInsert.rows.length > 0 } };

    res.render('page/incluir-aluno', result);
});


app.get('/alterar-aluno/:id', async (req, res) => {
    const resultSelect = await clientBase.query(`SELECT * FROM alunos WHERE id = $1`, [req.params.id]);
    res.render('page/alterar-aluno', { aluno: resultSelect.rows[0], result: '' });
});

app.post('/alterar-aluno/:id', async (req, res) => {
    const resultUpdate = await clientBase.query(`UPDATE alunos SET nome=$1, sobrenome=$2, endereco=$3 WHERE id = $4 RETURNING *`, 
        [req.body.nome, req.body.sobrenome, req.body.endereco, req.params.id]);
    const result = { aluno: resultUpdate.rows[0], result: { success: resultUpdate.rows.length > 0 } };

    res.render(`page/alterar-aluno`, result);
});


app.get('/excluir-aluno/:id', async (req, res) => {
    const resultSelect = await clientBase.query(`SELECT * FROM alunos WHERE id = $1`, [req.params.id]);
    res.render('page/excluir-aluno', { aluno: resultSelect.rows[0], result: '' });
});

app.post('/excluir-aluno/:id', async (req, res) => {
    const resultDelete = await clientBase.query(`DELETE FROM alunos WHERE id = $1 RETURNING *`, [req.params.id]);
    const result = { aluno: resultDelete.rows[0], result: { success: resultDelete.rows.length > 0 } };

    res.render(`page/excluir-aluno`, result);
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});