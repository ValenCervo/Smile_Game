// declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);

  btnReiniciar.classList.remove('invisivel');
  btnReiniciar.classList.add('visivel');

  btnJogarNovamente.classList.remove('visivel');
  btnJogarNovamente.classList.add('invisivel');
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;

  // esconde os gifs de confete
  const confeteDiv = document.getElementById("confete");
  const confete2Div = document.getElementById("confete2");

  confeteDiv.innerHTML = "";
  confete2Div.innerHTML = "";

  confeteDiv.classList.remove("visivel");
  confeteDiv.classList.add("invisivel");

  confete2Div.classList.remove("visivel");
  confete2Div.classList.add("invisivel");

  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
      divis[i].className = "inicial";

      let imagens = divis[i].getElementsByClassName("imgSmile");
      while (imagens.length > 0) {
        imagens[0].remove();
      }
    }
  }

  btnJogarNovamente.classList.remove('invisivel');
  btnJogarNovamente.classList.add('visivel');

  btnReiniciar.classList.remove('visivel');
  btnReiniciar.classList.add('invisivel');

  let imagem = document.getElementById("imagem");
  if (imagem != "") {
    imagem.remove();
  }
}

// função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.className = "imgSmile";
  img.src = "https://i.pinimg.com/736x/fe/2f/5c/fe2f5c3db9f9f9263b21823f29baa794.jpg";
  obj.appendChild(img);
}

// função que verifica a jogada
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    let sorteado = Math.floor(Math.random() * 4);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      const img = new Image(100);
      img.className = "imgSmile";
      img.src = "https://png.pngtree.com/png-vector/20230508/ourmid/pngtree-wrong-button-or-x-vector-design-png-image_7083025.png";
      obj.appendChild(img);

      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);

    // Mostrar confete se acertou 2 vezes (mude aqui para outro valor se quiser)
    if (acertos == 2) {
      const confeteDiv = document.getElementById("confete");
      const confete2Div = document.getElementById("confete2");

      confeteDiv.innerHTML = `<img src="https://i.pinimg.com/originals/28/79/09/287909ab5ef21d688c77048539e9c92a.gif" width="300">`;
      confete2Div.innerHTML = `<img src="https://i.pinimg.com/originals/28/79/09/287909ab5ef21d688c77048539e9c92a.gif" width="300">`;

      confeteDiv.classList.remove("invisivel");
      confeteDiv.classList.add("visivel");

      confete2Div.classList.remove("invisivel");
      confete2Div.classList.add("visivel");

        // Tocar som de vitória
        const audio = document.getElementById("audioVitoria");
        if (audio) {
          audio.play();
        }

      btnJogarNovamente.classList.remove('visivel');
      btnJogarNovamente.classList.add('invisivel');

      btnReiniciar.classList.remove('invisivel');
      btnReiniciar.classList.add('visivel');
    }

    // também mostra reiniciar se chegar a 5 tentativas
    if (tentativas == 4) {
      btnJogarNovamente.classList.remove('visivel');
      btnJogarNovamente.classList.add('invisivel');

      btnReiniciar.classList.remove('invisivel');
      btnReiniciar.classList.add('visivel');
    }
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
