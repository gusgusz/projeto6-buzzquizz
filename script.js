const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let user_quizzes_list;
let other_quizzes_list;
let id_user_quizz=[9655,9654,9653,9652]; // 9420,9419,9418,9417
let user_quizz;
let quizz_usuario;
let criar_quizz = false;
let app = document.querySelector('.app');
let campos;

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
      <input type="text" placeholder="Título do seu quizz">
      <input type="url" placeholder="URL da imagem do seu quizz">
      <input type="number" placeholder="Quantidade de perguntas do quizz">
      <input type="number" placeholder="Quantidade de níveis do quizz">
    </div>
    <button onclick="podeCriar()">
      Prosseguir pra criar perguntas
    </button>
  </div>`
}

function podeCriar() {
  campos = document.querySelectorAll('input');
  for (let i = 0; i < campos.length; i++) {
    if (campos[i].value === '') {
      return false
    } else {
      criarPerguntas()
    }
  }
}

function criarPerguntas() {
  app.innerHTML = ``
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
