const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const livros = [
  { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
  { id: 2, titulo: 'Livro 2', autor: 'Autor 2' },
  { id: 3, titulo: 'Livro 3', autor: 'Autor 3' },
];

app.get('/livros/:id', (req, res) => {
  const livroId = parseInt(req.params.id);
  const livro = livros.find(l => l.id === livroId);

  if (livro) {
    res.json(livro);
  } else {
    res.status(404).json({ mensagem: 'Livro não encontrado' });
  }
});

app.post('/livros', (req, res) => {
  const novoLivro = req.body;

  if (!novoLivro.id || !novoLivro.titulo || !novoLivro.autor) {
    res.status(400).json({ mensagem: 'Informe todas as informações do livro' });
  } else {
    const livroExistente = livros.find(l => l.id === novoLivro.id);

    if (livroExistente) {
      res.status(400).json({ mensagem: 'Livro já existe' });
    } else {
      livros.push(novoLivro);
      res.status(201).json({ mensagem: 'Livro adicionado com sucesso' });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});