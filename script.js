const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let user_quizzes_list;
let other_quizzes_list;
let id_user_quizz=[9655,9654,9653,9652]; // 9420,9419,9418,9417
let user_quizz;
let quizz_usuario;
let criar_quizz = false;
let app = document.querySelector('.app');
let campos;
let novo_quizz;
let nome_quizz;
let url_img_quizz;
let quantidade_perguntas;
let quantidade_niveis;
let perguntas = [];
let niveis = [];

let tipoMensagem = "message";
let destinatario = "Todos";

function renderiza_tela() {
  app.innerHTML += `<div class="pagina-lista-quizzes">
    <div class="quizzes usuario">
    </div>
    <div class="quizzes todos">
      <div class="cabecalho">
        <p>Todos os Quizzes</p>
      </div>
      <div class="lista-quizzes">
      </div>
    </div>
  </div>`
}

function muda_status_quizz() {
  if (id_user_quizz.length > 1){
    quizz_usuario.innerHTML += `<div class="tem-quizz">
    <div class="seus_quizzes">
      <p>Seus Quizzes</p>
      <div class="add_quizz" onclick="novoQuizz()">
        <ion-icon name="add"></ion-icon>
      </div>
    </div>
  </div>`
  }
  else {
    quizz_usuario.innerHTML += `<div class="criar-quizz">
    <div class="conteudo">Você não criou nenhum<br>quizz ainda :(</div>
    <div class="button_quizz" onclick="novoQuizz()">Criar Quizz</div>
  </div>`
  }
}

function call_quizz() {
  const promise = axios.get(urlAPI);
  promise.then(write_quizz);
}


function write_quizz(resposta) {
    console.log(resposta.data.length);
    for (let i = 0; i < resposta.data.length; i++) {
      console.log(id_user_quizz.includes(resposta.data[i].id))
      if ( id_user_quizz.includes(resposta.data[i].id)  ){
        quizzes_div=document.body.children[1].children[0].children[0].children[0];
      }
      else{
        quizzes_div=document.body.children[1].children[0].children[1].children[1];
      }
      create_quizz_div(resposta.data[i].id,resposta.data[i].image,resposta.data[i].title,quizzes_div)
    }
}

function create_quizz_div(div_id,img_src,title,quizzes_div){

  // Create quizz div
  let div = document.createElement("div");
  div.id = div_id ;
  div.onclick=wipe_out_sreen_1_show_2;
  div.className = "quizz";

  quizzes_div.appendChild(div);  

  // Create image
  let el_img = document.createElement("img");
  quizzes_div.children[quizzes_div.children.length-1].appendChild(el_img);
  el_img.src=img_src;

  // Create title div inside quizz div
  let title_div = document.createElement("div");
  title_div.className = "titulo";
  // console.log(title_div)
  quizzes_div.children[quizzes_div.children.length-1].appendChild(title_div);
  console.log(quizzes_div.children[quizzes_div.children.length-1])
  title_div.innerHTML =title;
}

function novoQuizz() {
  app.innerHTML = `<div class="novo-quizz">
    <p>Comece pelo começo</p>
    <div class="opcoes">
      <input type="text" placeholder="Título do seu quizz" id="nome">
      <input type="url" placeholder="URL da imagem do seu quizz" id="url-img-quizz">
      <input type="number" placeholder="Quantidade de perguntas do quizz" id="quantidade-perguntas">
      <input type="number" placeholder="Quantidade de níveis do quizz" id="quantidade-niveis">
    </div>
    <button onclick="podeCriarPergunta()">
      Prosseguir pra criar perguntas
    </button>
  </div>`
}

function podeCriarPergunta() {
  campos = document.querySelectorAll('input');
  nome_quizz = document.querySelector('#nome');
  url_img_quizz = function() {try {new URL(document.querySelector('#url-img-quizz'))} catch(err) {url_img_quizz = undefined}};
  quantidade_perguntas = Number(document.querySelector('#quantidade-perguntas').value);
  quantidade_niveis = Number(document.querySelector('#quantidade-niveis').value);
  for (let i = 0; i < campos.length; i++) {
    if (nome_quizz.length < 20 || nome_quizz.length > 65 || url_img_quizz === undefined || quantidade_perguntas < 3 || quantidade_niveis < 2) {
      alert('Preencha os dados corretamente')
      return false
    }
  }
  novo_quizz = {title: nome_quizz, image: url_img_quizz, questions: perguntas, levels: niveis}
  criarPerguntas()
}

function criarPerguntas() {
  app.innerHTML = `<div class="novo-quizz">
    <p>Crie suas perguntas</p>
    <div class="perguntas">
    </div>
    <button onclick="podeCriarNivel()">
      Prosseguir pra criar níveis
    </button>
  </div>`
  let perguntas = document.querySelector('.perguntas')
  for (let i = 0; i < quantidade_perguntas; i++) {
    perguntas.innerHTML += `<div class="pergunta">
    <p>Pergunta ${i + 1}</p>
    <img onclick="editarPergunta(this)" src="img/pencil.png">
  </div>`
  }
}

function editarPergunta(elemento) {
  let pergunta = elemento.parentNode
  elemento.classList.add('escondido')
  pergunta.classList.add('pergunta-estendida')
  pergunta.innerHTML += `<input class='nome-pergunta' type="text" placeholder="Texto da pergunta"></input>
  <input class='cor-pergunta' type="text" placeholder="Cor de fundo da pergunta"></input>
  <p>Resposta correta</p>
  <input class='resposta-correta' type="text" placeholder="Resposta correta"></input>
  <input class='url-img-resposta-correta' type="url" placeholder="URL da imagem"></input>
  <p>Respostas incorretas</p>
  <div class="resposta-incorreta">
    <input class='resposta-incorreta-1' type="text" placeholder="Resposta incorreta 1"></input>
    <input class='url-img-resposta-incorreta-1' type="url" placeholder="URL da imagem 1"></input>
  </div>
  <div class="resposta-incorreta">
    <input class='resposta-incorreta-2' type="text" placeholder="Resposta incorreta 2"></input>
    <input class='url-img-resposta-incorreta-2' type="url" placeholder="URL da imagem 2"></input>
  </div>
  <div class="resposta-incorreta">
    <input class='resposta-incorreta-3' type="text" placeholder="Resposta incorreta 3"></input>
    <input class='url-img-resposta-incorreta-3' type="url" placeholder="URL da imagem 3"></input>
  </div>`
}

function podeCriarNivel() {
  for (let i = 0; i < quantidade_perguntas; i++) {
    nome_pergunta = document.querySelectorAll('.nome-pergunta')[i].value;
    cor_pergunta = document.querySelectorAll('.cor-pergunta')[i].value;
    resposta_correta = document.querySelectorAll('.resposta-correta')[i].value;
    url_resposta_correta = function() {try {new URL(document.querySelectorAll('.url-img-resposta-correta')[i])} catch(err) {url_resposta_correta = undefined}};
    resposta_incorreta_1 = document.querySelectorAll('.resposta-incorreta-1')[i].value;
    url_resposta_incorreta_1 = function() {try {new URL(document.querySelectorAll('.url-img-resposta-incorreta-1')[i])} catch(err) {url_resposta_incorreta_1 = undefined}};
    resposta_incorreta_2 = document.querySelectorAll('.resposta-incorreta-2')[i].value;
    url_resposta_incorreta_2 = function() {try {new URL(document.querySelectorAll('.url-img-resposta-incorreta-2')[i])} catch(err) {url_resposta_incorreta_2 = undefined}};
    resposta_incorreta_3 = document.querySelectorAll('.resposta-incorreta-3')[i].value;
    url_resposta_incorreta_3 = function() {try {new URL(document.querySelectorAll('.url-img-resposta-incorreta-3')[i])} catch(err) {url_resposta_incorreta_3 = undefined}};
    if (resposta_incorreta_2 === '') {
      perguntas.push({title: nome_pergunta, color: cor_pergunta, answers: [{text: resposta_correta, image: url_resposta_correta, isCorrectAnswer: true}, {text: resposta_incorreta_1, image: url_resposta_incorreta_1, isCorrectAnswer: false}]})
    } else if (resposta_incorreta_2 !== '' && resposta_incorreta_3 === '') {
      perguntas.push({title: nome_pergunta, color: cor_pergunta, answers: [{text: resposta_correta, image: url_resposta_correta, isCorrectAnswer: true}, {text: resposta_incorreta_1, image: url_resposta_incorreta_1, isCorrectAnswer: false}, {text: resposta_incorreta_2, image: url_resposta_incorreta_2, isCorrectAnswer: false}]})
    } else {
      perguntas.push({title: nome_pergunta, color: cor_pergunta, answers: [{text: resposta_correta, image: url_resposta_correta, isCorrectAnswer: true}, {text: resposta_incorreta_1, image: url_resposta_incorreta_1, isCorrectAnswer: false}, {text: resposta_incorreta_2, image: url_resposta_incorreta_2, isCorrectAnswer: false}, {text: resposta_incorreta_3, image: url_resposta_incorreta_3, isCorrectAnswer: false}]})
    }
  }
  campos = document.querySelectorAll('input');
  for (let i = 0; i < campos.length; i++) {
    if (nome_pergunta.length < 20 || cor_pergunta.length !== 7 || cor_pergunta[0] !== '#' || resposta_correta === '' || url_resposta_correta === undefined || resposta_incorreta_1 === '' || url_resposta_incorreta_1 === undefined) {
      alert('Preencha os dados corretamente')
      return false
    }
  }
  criarNiveis()
}

function criarNiveis() {
  app.innerHTML = `<div class="novo-quizz">
    <p>Agora, decida os níveis</p>
    <div class="niveis">
    </div>
    <button onclick="podeFinalizarQuizz()">
      Finalizar Quizz
    </button>
  </div>`
  let niveis = document.querySelector('.niveis')
  for (let i = 0; i < quantidade_niveis; i++) {
    niveis.innerHTML += `<div class="nivel">
    <p>Nível ${i + 1}</p>
    <img onclick="editarNivel(this)" src="img/pencil.png">
  </div>`
  }
}

function editarNivel(elemento) {
  elemento.classList.add('escondido')
  let nivel = elemento.parentNode
  nivel.classList.add('nivel-estendido')
  nivel.innerHTML += `<input class='titulo-nivel' type="text" placeholder="Título do nível"></input>
  <input class='percentual-nivel' type="number" placeholder="% de acerto mínima"></input>
  <input class='url-img-nivel' type="text" placeholder="URL da imagem do nível"></input>
  <input class='descricao-nivel' type="text" placeholder="Descrição do nível"></input>`
}

function podeFinalizarQuizz() {
  for (let i = 0; i < quantidade_niveis; i++) {
    titulo_nivel = document.querySelectorAll('.titulo-nivel')[i].value;
    percentual_nivel = Number(document.querySelectorAll('.percentual-nivel')[i].value);
    url_imagem_nivel = function() {try {new URL(document.querySelectorAll('.url-img-nivel')[i])} catch(err) {url_imagem_nivel = undefined}};
    descricao_nivel = document.querySelectorAll('.descricao-nivel')[i].value;
    niveis.push({title: titulo_nivel, minValue: percentual_nivel, image: url_imagem_nivel, text: descricao_nivel})
  }
  campos = document.querySelectorAll('input');
  for (let i = 0; i < campos.length; i++) {
    if (titulo_nivel.length < 10 || percentual_nivel < 0 || percentual_nivel > 100 || url_imagem_nivel === undefined || descricao_nivel.length < 30) {
      alert('Preencha os dados corretamente')
    }
  }
  let percentuais = []
  for (let i = 0; i < document.querySelectorAll('.percentual-nivel').length; i++) {
    percentual_nivel = Number(document.querySelectorAll('.percentual-nivel')[i].value)
    percentuais.push(percentual_nivel)
  }
  if (!percentuais.includes(0)) {
    alert('Preencha os dados corretamente')
  }
  finalizarQuizz()
}

function finalizarQuizz() {
  app.innerHTML = `<div class="novo-quizz">
    <p>Seu quizz está pronto!</p>
    <img src='${url_img_quizz}'>
    <button onclick="acessarQuizz()">
      Acessar Quizz
    </button>
  </div>`
}

renderiza_tela();
quizz_usuario = document.querySelector(".usuario");
muda_status_quizz();
call_quizz();

function wipe_out_sreen_1_show_2()  {
  screen1=document.querySelector(".pagina-lista-quizzes");
  screen1.style.display="none";
  // screen2=document.querySelector(".pagina-2");
  // screen2.style.display="inline";
}
