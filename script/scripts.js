const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let clas = "";
let stri = "";
let tituloC = "";
let imagemC = "";
let perguntasC = 0;
let nivelC = 0;
const variaveisCriar = {};


function renderizarPerguntasC(numb) { 
  for(let i=0; i <numb; i++) {
    document.querySelector('.recebidos').innerHTML += `
   <div id="${i+1}" class="p${i+1}">
      <div class="tituloC">
      Pergunta ${i+1}
      <ion-icon name="pencil-outline" onclick="abrirPerguntasC(this)"></ion-icon>
      </div>
   </div> `;

  }
}
function abrirPerguntasC(px) {
  // const toString = document.getElementById('1').outerHTML;
    const pLocal = px.parentNode.outerHTML[37];
    document.getElementById(pLocal).innerHTML = ` 
    <div class="tituloC">
    Pergunta ${pLocal}
  </div>
  <input id="placeholder" type="text" placeholder="Texto da pergunta" class="input-p${pLocal}">
  <input id="placeholder" type="color" placeholder="Cor de fundo da pergunta" class="input-cor${pLocal}">
  <div class="tituloC">
    Resposta correta
  </div>
  <input id="placeholder" type="text" placeholder="Resposta correta" class="input-rc${pLocal}">
  <input id="placeholder" type="url" placeholder="URL da imagem" class="input-img${pLocal}">
  <div class="tituloC">
    Respostas incorretas
  </div>
  <input id="placeholder" type="text" placeholder="Resposta incorreta" class="input-re${pLocal}1">
  <input id="placeholder" type="url" placeholder="URL da imagem" class="input-img${pLocal}1">
  <div class="espaco"></div>
  <input id="placeholder" type="text" placeholder="Resposta incorreta" class="input-re${pLocal}2">
  <input id="placeholder" type="url" placeholder="URL da imagem" class="input-img${pLocal}2">
  <div class="espaco"></div>
  <input id="placeholder" type="text" placeholder="Resposta incorreta" class="input-re${pLocal}3">
  <input id="placeholder" type="url" placeholder="URL da imagem" class="input-img${pLocal}3">
  <div class="espaco"></div>
`;
    
  

    console.log(pLocal);
} 

  function irCriar() {
    // vai pra tela 3
   

    const criar1 = ` 
    <div class="cabecalhoC">
    <div class="tituloC">
      Comece pelo começo
    </div>
  </div>
  <div class="recebidos">
    <input id="placeholder" type="text" placeholder="Título do seu quizz" class="input-titulo">
    <input id="placeholder" type="url" placeholder="URL da imagem do seu quizz" class="input-imagem">
    <input id="placeholder" type="number" placeholder="Quantidade de perguntas do quizz" class="input-perguntas">
    <input id="placeholder" type="number" placeholder="Quantidade de níveis do quizz" class="input-nivel">
  </div>
  <button onclick="prosseguirPcriar()">Prosseguir pra criar perguntas</button>
  
  `;
  document.querySelector('.app ').innerHTML = `<div class="ciriacao"></div>`;
  document.querySelector('.criacao ').innerHTML = criar1;
}

function prosseguirPcriar() {
  tituloC = document.querySelector(".input-titulo").value;
  imagemC = document.querySelector(".input-imagem").value;
  perguntasC = document.querySelector(".input-perguntas").value;
  nivelC = document.querySelector(".input-nivel").value;
  console.log("oi");
  variaveisCriar.title = tituloC;
  variaveisCriar.image = imagemC; 

  
    
const criar2 = ` <div class="cabecalhoC">
                    <div class="tituloC">
                      Crie suas perguntas
                    </div>
                  </div>
                  <div class="recebidos">
                    
                   </div>
                   <button onclick="prosseguirPnivel()">Prosseguir pra criar níveis</button>
                  
                  `;


if(tituloC.length < 20){
  alert("O título deve ter no minimo 20 caracteres!");
  console.log(perguntasC.length);
}
if(tituloC.length > 65){
  alert("O título deve ter no máximo 65 caracteres!");
  console.log(perguntasC.length);
}


  if(perguntasC < 3){
    alert("É necessário pelo menos 3 perguntas!");
  }
  if(nivelC < 2){
    alert("É necessário pelo menos 2 níveis!");
  
  }
  if(perguntasC >= 3 && nivelC >= 2 && tituloC.length > 20 && tituloC.length < 65){
    if((tituloC && imagemC && perguntasC && nivelC) != undefined){
      console.log("foiii");
      document.querySelector('.criacao').innerHTML = criar2;
        if(document.querySelector('.criacao').innerHTML == criar2) {
      
      renderizarPerguntasC(perguntasC) ;
          variaveisCriar.title = tituloC;
          variaveisCriar.image = imagemC;

        }
      
    }
  }
}

 

 
function abrirNivelC(px) {
  // const toString = document.getElementById('1').outerHTML;
    let pLocal = px.parentNode.outerHTML[34].toString();
    let pLocal2 = px.parentNode.outerHTML[35].toString();
    console.log(pLocal);
    console.log(pLocal2);
    

    let pLocalR = pLocal + pLocal2;
    console.log(pLocalR);


   document.getElementById(pLocalR).innerHTML = ` 
   <div class="tituloC">
   Nível ${pLocalR}
 </div>
 <input id="placeholder" type="text" placeholder="Título do nível" class="input-titN${pLocalR}">
 <div class="espaco"></div>
 <input id="placeholder" type="number" placeholder="% de acerto mínima" class="input-porctN${pLocalR}">
 <div class="espaco"></div>
 <input id="placeholder" type="url" placeholder="URL da imagem do nível" class="input-urlN${pLocalR}">
  <div class="espaco"></div>
 <input id="placeholder" type="text" placeholder="Descrição do nível" class="input-descN${pLocalR}">`;
    
   console.log(pLocalR);
} 

function renderizarNiveisC(numb) { 
  for(let i=0; i <numb; i++) {
    document.querySelector('.recebidos').innerHTML += `
   <div id="${i+1}" class="p${i+1}">
      <div class="tituloC">
      Nível ${i+1}
      <ion-icon name="pencil-outline" onclick="abrirNivelC(this)"></ion-icon>
      </div>
   </div> `;
  }
}

function prosseguirPnivel() {
  function pegarPerguntas(number) {
    
    for(let i = 0; i <=number; i++ ) {
      if(!document.querySelector(`.input-cor${i+1}`)){
        return null;
      }
      // variaveisCriar.title = document.querySelector(`.input-titN${i+1}`)?.value;
      variaveisCriar.questions = [];
      variaveisCriar.questions[i] =[{title: document.querySelector(`.input-p${i+1}`).value, color:document.querySelector(`.input-cor${i+1}`).value}];
      variaveisCriar.questions[i].answers = [];
      variaveisCriar.questions[i].answers[0] = {text: document.querySelector(`.input-rc${i+1}`).value , image: document.querySelector(`.input-img${i+1}`).value , isCorrectAnswer:true};
      variaveisCriar.questions[i].answers[1] = {text: document.querySelector(`.input-re${i+1}1`).value , image: document.querySelector(`.input-img${i+1}1`).value , isCorrectAnswer:false};
      variaveisCriar.questions[i].answers[2] = {text: document.querySelector(`.input-re${i+1}2`).value, image: document.querySelector(`.input-img${i+1}2`).value , isCorrectAnswer:false};
      variaveisCriar.questions[i].answers[3] = {text: document.querySelector(`.input-re${i+1}3`).value , image: document.querySelector(`.input-img${i+1}3`).value , isCorrectAnswer:false};
    

    }
    
     
  }
  pegarPerguntas(perguntasC);
  console.log(variaveisCriar);

  console.log(variaveisCriar);
  // vai pra tela 3.3
  console.log(nivelC);
  const criar3 = `  <div class="cabecalhoC">
  <div class="tituloC">
    Agora, decida os níveis!
  </div>
</div>

<div class="recebidos">
 
</div>
<button onclick="finalizarCriacao()">Finalizar Quizz </button>
                  
                  `;
    document.querySelector('.criacao').innerHTML = criar3;
      if (document.querySelector('.criacao').innerHTML == criar3) {
        
       renderizarNiveisC(nivelC);
        
      }
    }

    function finalizarCriacao() {
      function pegarNiveis(number) {
        for(let i = 0; i < number; i++) {
          variaveisCriar.levels[i] = {title: document.querySelector(`.input-titN${i+1}.`).value , image: document.querySelector(`input-urlN${i+1}`).value , text: document.querySelector(`.input-descN${i+1}`), minValue: document.querySelector(`input-porctN${i+1}`)}
        }
      }
      
      pegarNiveis(nivelC);
      axios.get(url).then(pegar);

      function pegar(promessa) {
       let tamanho = promessa.dados.length;
       axios.post(url/tamanho , variaveisCriar);
      }
      console.log(promessa)
      document.querySelector('.criacao').innerHTML = `<div class="cabecalhoC">
      <div class="tituloC">
        Seu quizz está pronto!
      </div>
    </div>
     
        <div class="quizz">
          <img src="${imagemC}">
          <div class="titulo">${tituloC}</div>
        </div>
    
    <button onclick="acessar()">Acessar Quizz</button>
    <button  onclick="acessar()">Voltar pra home</button>
      
      
    </div>`
    }
