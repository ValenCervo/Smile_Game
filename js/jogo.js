// declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// captura os botões e elementos
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const confeteDiv = document.getElementById("confete");
const confete2Div = document.getElementById("confete2");

// funções utilitárias
function alternarVisibilidade(elemento, visivel) {
  elemento.classList.toggle('visivel', visivel);
  elemento.classList.toggle('invisivel', !visivel);
}

function criarImagem(src, classe = "imgSmile", largura = 100) {
  const img = new Image(largura);
  img.className = classe;
  img.src = src;
  return img;
}

// reinicia tudo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente();
  atualizaPlacar(0, 0);

  alternarVisibilidade(btnReiniciar, true);
  alternarVisibilidade(btnJogarNovamente, false);
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;

  [confeteDiv, confete2Div].forEach(div => {
    div.innerHTML = "";
    alternarVisibilidade(div, false);
  });

  document.querySelectorAll("div[id]").forEach(div => {
    if (["0", "1", "2", "3"].includes(div.id)) {
      div.className = "inicial";
      div.querySelectorAll(".imgSmile").forEach(img => img.remove());
    }
  });

  alternarVisibilidade(btnJogarNovamente, true);
  alternarVisibilidade(btnReiniciar, false);

  const imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();
}

// atualiza o placar com validação
function atualizaPlacar(acertos, tentativas) {
  if (tentativas === 0) {
    desempenho = 0;
  } else {
    desempenho = (acertos / tentativas) * 100;
  }

  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  obj.appendChild(criarImagem("https://i.pinimg.com/736x/fe/2f/5c/fe2f5c3db9f9f9263b21823f29baa794.jpg"));
}

// verifica jogada
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }

  jogar = false;
  tentativas++;

  const sorteado = Math.floor(Math.random() * 4);

  if (obj.id == sorteado) {
    acertou(obj);
    acertos++;
  } else {
    obj.className = "errou";
    obj.appendChild(criarImagem("https://png.pngtree.com/png-vector/20230508/ourmid/pngtree-wrong-button-or-x-vector-design-png-image_7083025.png"));
    acertou(document.getElementById(sorteado));
  }

  atualizaPlacar(acertos, tentativas);

  if (acertos == 2) {
    const confeteGif = `<img src="https://i.pinimg.com/originals/28/79/09/287909ab5ef21d688c77048539e9c92a.gif" width="300">`;
    confeteDiv.innerHTML = confeteGif;
    confete2Div.innerHTML = confeteGif;

    [confeteDiv, confete2Div].forEach(div => alternarVisibilidade(div, true));

    const audio = document.getElementById("audioVitoria");
    if (audio) audio.play();

    alternarVisibilidade(btnJogarNovamente, false);
    alternarVisibilidade(btnReiniciar, true);
  }

  if (tentativas == 4) {
    alternarVisibilidade(btnJogarNovamente, false);
    alternarVisibilidade(btnReiniciar, true);
  }
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
