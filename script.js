const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let user_quizzes_list;
let other_quizzes_list;
let id_user_quizz=["1","2","3","4","5",true];
let id_other_quizz=["6","7","8","9","10",false];
let user_quizz;

let tipoMensagem = "message";
let destinatario = "Todos";

const belo=prompt("Belo teste");

// if (id_user_quizz.length>1){
//   id_user_quizz
// }

user_quizz=call_quizz(id_user_quizz);
user_quizz=call_quizz(id_other_quizz);

function call_quizz(id_quizz) {
  user_quizz=id_quizz.pop();
    for (let i = 0; i < id_quizz.length; i++) {
      const promise = axios.get(`${urlAPI}/${id_quizz[i]}`);
      promise.then(write_quizz); 
    }
  return user_quizz
}


function write_quizz(resposta) {
    // console.log(resposta.data);
    console.log(resposta.data.image)
    create_quizz_div(resposta.data.id,resposta.data.image,resposta.data.title)
}

function create_quizz_div(div_id,img_src,title){
  console.log(user_quizz)
  // Select father div
  let quizzes_div;
  if (user_quizz){
    quizzes_div=document.body.children[1].children[0].children[0].children[0];
  }
  else{
    quizzes_div=document.body.children[1].children[0].children[1].children[1];
  }

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