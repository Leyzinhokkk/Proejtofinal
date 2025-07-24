const API_KEY = '77c4e2b070a2e1396500d0b42ebf7cec';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const LANG = 'pt-BR';

let filmesAtuais = [];

async function carregarFilmes(tipo) {
  const res = await fetch(`${BASE_URL}/movie/${tipo}?api_key=${API_KEY}&language=${LANG}`);
  const dados = await res.json();
  filmesAtuais = dados.results;
  exibirFilmes(filmesAtuais);
}

function exibirFilmes(filmes) {
  const container = document.getElementById('filmes');
  container.innerHTML = '';
  filmes.forEach(filme => {
    if (!filme.poster_path) return;
    const img = document.createElement('img');
    img.src = IMG_URL + filme.poster_path;
    img.alt = filme.title;
    img.onclick = () => mostrarDetalhes(filme);
    container.appendChild(img);
  });
}

function mostrarDetalhes(filme) {
  document.getElementById('titulo').textContent = filme.title;
  document.getElementById('descricao').textContent = filme.overview || 'Sem descrição.';
  document.getElementById('lancamento').textContent = filme.release_date || 'Não informado';
  document.getElementById('nota').textContent = filme.vote_average || 'Sem nota';
  document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

function buscarFilmes() {
  const termo = document.getElementById('pesquisa').value.toLowerCase();
  const filtrados = filmesAtuais.filter(f =>
    f.title.toLowerCase().includes(termo)
  );
  exibirFilmes(filtrados);
}


carregarFilmes('now_playing'); 
