const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let user_quizzes_list;
let other_quizzes_list;
let id_user_quizz=[]; // 9420,9419,9418,9417
let user_quizz;

let tipoMensagem = "message";
let destinatario = "Todos";

const belo=prompt("Belo teste");

function muda_status_quizz() {
  let quizz_usuario = document.querySelector(".usuario")
  if (id_user_quizz.length > 1){
    quizz_usuario.innerHTML += `<div class="tem-quizz">
    <div class="seus_quizzes">
      <p>Seus Quizzes</p>
    </div>
    <div class="add_quizz" onclick="novoQuizz()">
      <ion-icon name="add"></ion-icon>
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

muda_status_quizz();

call_quizz();

function call_quizz() {
  const promise = axios.get(urlAPI);
  promise.then(write_quizz);
}


function write_quizz(resposta) {
    console.log(resposta.data);
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
  console.log(user_quizz)

  // Create quizz div
  let div = document.createElement("div");
  div.id = div_id ;
  div.className = "quizz";
  quizzes_div.appendChild(div);  

  // Create image
  let el_img = document.createElement("img");
  quizzes_div.children[quizzes_div.children.length-1].appendChild(el_img);
  el_img.src=img_src;

  // Create title div inside quizz div
  let title_div = document.createElement("div");
  title_div.className = "titulo";
  quizzes_div.children[quizzes_div.children.length-1].appendChild(title_div);
  title_div.innerHTML =title;
}

function novoQuizz() {
  
}