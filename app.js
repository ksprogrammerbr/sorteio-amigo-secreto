// Array para armazenar os nomes dos amigos
let amigos = [];
let historicoSorteios = [];
let audioSuspense;
let audioCelebracao;

// Configurações
const volumeMensagemFalada = 2.0; // Ajuste o volume aqui
let confettiInterval; // Variável para armazenar o intervalo do confete

// Função para inicializar os sons
function inicializarSons() {
  audioSuspense = new Audio("assets/suspense.mp3");
  audioCelebracao = new Audio("assets/celebracao.mp3");
  audioSuspense.loop = true;
  audioCelebracao.volume = 0.1; // Ajusta o volume do áudio de celebração
}

// Função para adicionar amigo à lista
function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (nome === "") {
    alert("Por favor, digite um nome válido!");
    return;
  }

  const regex = /^[a-zA-Z\u00C0-\u017F\s]+$/;
  if (!regex.test(nome)) {
    alert("Por favor, digite um nome válido (apenas letras e espaços).");
    return;
  }

  if (amigos.includes(nome)) {
    alert("Este nome já foi adicionado!");
    return;
  }

  amigos.push(nome);
  input.value = "";
  atualizarListaAmigos();
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.textContent = amigo;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => removerAmigo(index);
    li.appendChild(btnRemover);

    lista.appendChild(li);
  });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
  amigos.splice(index, 1);
  atualizarListaAmigos();
}

// Função para disparar o efeito de confete (única execução)
function dispararConfete() {
  const config = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
  };

  confetti(config);

  setTimeout(() => {
    confetti({
      ...config,
      particleCount: 50,
      origin: { y: 0.7 },
    });
  }, 250);
}

// Função para iniciar a animação contínua de confetes no fundo
function iniciarConfettiBackground() {
  const container = document.querySelector(".container"); // Seleciona o container principal
  confettiInterval = setInterval(() => {
    confetti({
      particleCount: 20,
      spread: 70,
      origin: { y: 0.6 },
      colors: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ],
      zIndex: 0, // Garante que os confetes fiquem atrás do conteúdo
    });
  }, 500);
  container.style.position = "relative"; // Garante que o container é a referência para o zIndex
}

// Função para parar a animação contínua de confetes
function pararConfettiBackground() {
  clearInterval(confettiInterval);
}

// Função para sortear um amigo
function sortearAmigo() {
  if (amigos.length < 2) {
    alert("Adicione pelo menos 2 amigos para realizar o sorteio!");
    return;
  }

  document.getElementById("sortear").disabled = true;

  let contador = 3;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `<li>Sorteando em ${contador}...</li>`;

  const countdownInterval = setInterval(() => {
    contador--;
    if (contador > 0) {
      resultado.innerHTML = `<li>Sorteando em ${contador}...</li>`;
    } else {
      resultado.innerHTML = "<li>Sorteando...</li>";
      clearInterval(countdownInterval);
      realizarSorteio(resultado);
    }
  }, 1000);
}

function realizarSorteio(resultado) {
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];
  const sorteadoPara = amigos[(indiceAleatorio + 1) % amigos.length];

  // Armazenar o sorteio no "banco de dados" local
  armazenarSorteio(amigoSorteado, sorteadoPara);

  historicoSorteios.push({ de: amigoSorteado, para: sorteadoPara });

  if (audioSuspense) {
    audioSuspense.play();
  }

  resultado.innerHTML = "";

  let dots = "";
  let count = 0;
  const suspense = setInterval(() => {
    dots += ".";
    if (dots.length > 3) dots = "";
    resultado.innerHTML = `<li>Sorteando${dots}</li>`;
    count++;

    if (count >= 5) {
      clearInterval(suspense);
      resultado.innerHTML = `<li id="amigoSorteado">🎉 ${amigoSorteado} -> ${sorteadoPara}! 🎉</li>`;

      const amigoSorteadoElement = document.getElementById("amigoSorteado");
      amigoSorteadoElement.classList.add("piscar");

      if (audioCelebracao) {
        audioCelebracao.play();
      }

      audioSuspense.pause();
      audioSuspense.currentTime = 0;

      dispararConfete();

      //Acessibilidade: Adiciona texto alternativo para o resultado do sorteio
      amigoSorteadoElement.setAttribute(
        "aria-label",
        `Resultado do sorteio: ${amigoSorteado} vai presentear ${sorteadoPara}`
      );

      setTimeout(() => {
        exibirMensagemParabens(amigoSorteado, sorteadoPara);
      }, 1500);

      atualizarHistoricoSorteios();

      amigos = amigos.filter((amigo) => amigo !== amigoSorteado);

      atualizarListaAmigos();

      document.getElementById("sortear").disabled = false;

      // Iniciar a animação de confetes no fundo
      iniciarConfettiBackground();
    }
  }, 500);
}

function exibirMensagemParabens(amigoSorteado, sorteadoPara) {
  const mensagem = `Parabéns ${amigoSorteado}, pode gastar seu dinheiro suado no presente para ${sorteadoPara}!`;

  // Usar a API de síntese de fala
  const utterance = new SpeechSynthesisUtterance(mensagem);
  speechSynthesis.speak(utterance);
  utterance.volume = volumeMensagemFalada;

  // Criar o popup customizado
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "×";
  closeBtn.onclick = () => popupContainer.remove();

  const messageText = document.createElement("p");
  messageText.textContent = mensagem;

  popupContent.appendChild(closeBtn);
  popupContent.appendChild(messageText);
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);
}

// Função para atualizar o histórico de sorteios na tela
function atualizarHistoricoSorteios() {
  const listaHistorico = document.getElementById("historicoSorteios");
  listaHistorico.innerHTML = "";

  historicoSorteios.forEach((sorteio) => {
    const li = document.createElement("li");
    li.textContent = `${sorteio.de} -> ${sorteio.para}`;
    listaHistorico.appendChild(li);
  });
}

// Função para sortear novamente
function sortearNovamente() {
  document.getElementById("resultado").innerHTML = "";
  amigos = [];
  atualizarListaAmigos();
  historicoSorteios = [];
  atualizarHistoricoSorteios();

  // Parar a animação de confetes no fundo
  pararConfettiBackground();
}

// Função para baixar o histórico de sorteios em TXT
function baixarHistorico() {
  let texto = "Histórico de Sorteios:\n";
  historicoSorteios.forEach((sorteio) => {
    texto += `${sorteio.de} -> ${sorteio.para}\n`;
  });

  const blob = new Blob([texto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "historico_sorteios.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Função para armazenar o sorteio no localStorage
function armazenarSorteio(de, para) {
  let sorteiosAnteriores = localStorage.getItem("sorteios") || "[]";
  sorteiosAnteriores = JSON.parse(sorteiosAnteriores);
  sorteiosAnteriores.push({ de: de, para: para });
  localStorage.setItem("sorteios", JSON.stringify(sorteiosAnteriores));
}

// Função para carregar o histórico de sorteios do localStorage
function carregarHistorico() {
  let sorteiosAnteriores = localStorage.getItem("sorteios") || "[]";
  sorteiosAnteriores = JSON.parse(sorteiosAnteriores);
  historicoSorteios = sorteiosAnteriores;
  atualizarHistoricoSorteios();
}

// Adicionar evento de tecla Enter no input
document.getElementById("amigo").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adicionarAmigo();
  }
});

// Adicionar evento de clique no botão "Sortear Novamente"
document
  .getElementById("sortearNovamente")
  .addEventListener("click", sortearNovamente);

// Adicionar evento de clique no botão "Baixar Histórico"
document
  .getElementById("baixarHistorico")
  .addEventListener("click", baixarHistorico);

// Inicializar os sons ao carregar a página
window.onload = () => {
  inicializarSons();
  // Carregar o histórico de sorteios ao carregar a página
  carregarHistorico();
};
