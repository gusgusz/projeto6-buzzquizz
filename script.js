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
    if (campos[i].value === '') {
      return false
    } else if (nome_quizz.length < 20 || nome_quizz.length > 65 || url_img_quizz === undefined || quantidade_perguntas < 3 || quantidade_niveis < 2) {
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
  pergunta.innerHTML += `<input class='extensao' type="text" placeholder="Texto da pergunta"></input>
  <input class='extensao' type="text" placeholder="Cor de fundo da pergunta"></input>
  <p class='extensao'>Resposta correta</p>
  <input class='extensao' type="text" placeholder="Resposta correta"></input>
  <input class='extensao' type="url" placeholder="URL da imagem"></input>
  <p class='extensao'>Respostas incorretas</p>
  <div class="resposta-incorreta extensao">
    <input class='extensao' type="text" placeholder="Resposta incorreta 1"></input>
    <input class='extensao' type="url" placeholder="URL da imagem 1"></input>
  </div>
  <div class="resposta-incorreta extensao">
    <input class='extensao' type="text" placeholder="Resposta incorreta 2"></input>
    <input class='extensao' type="url" placeholder="URL da imagem 2"></input>
  </div>
  <div class="resposta-incorreta extensao">
    <input class='extensao' type="text" placeholder="Resposta incorreta 3"></input>
    <input class='extensao' type="url" placeholder="URL da imagem 3"></input>
  </div>`
}

function podeCriarNivel() {
  campos = document.querySelectorAll('input');
  for (let i = 0; i < campos.length; i++) {
    if (campos[i].value === '') {
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
  nivel.innerHTML += `<input class='extensao' type="text" placeholder="Título do nível"></input>
  <input class='extensao' type="number" placeholder="% de acerto mínima"></input>
  <input class='extensao' type="text" placeholder="URL da imagem do nível"></input>
  <input class='extensao' type="text" placeholder="Descrição do nível"></input>`
}

function podeFinalizarQuizz() {
  campos = document.querySelectorAll('input');
  for (let i = 0; i < campos.length; i++) {
    if (campos[i].value === '') {
      return false
    } else {
      finalizarQuizz()
    }
  }
}

function finalizarQuizz() {
  app.innerHTML = `<div class="novo-quizz">
    <p>Seu quizz está pronto!</p>
    <img src=''>
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
