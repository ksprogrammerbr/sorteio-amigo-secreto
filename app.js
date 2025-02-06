// Array para armazenar os nomes dos amigos
let amigos = [];
let historicoSorteios = [];
let audioSuspense;
let audioCelebracao;
let confettiInterval;

// Configurações
const volumeMensagemFalada = 2.0; // Ajuste o volume aqui

// Função para inicializar os sons
function inicializarSons() {
  audioSuspense = new Audio("assets/suspense.mp3");
  audioCelebracao = new Audio("assets/celebracao.mp3");
  audioSuspense.loop = true;
  audioCelebracao.volume = 0.1; // Ajusta o volume do áudio de celebração
}

// Função para adicionar amigo à lista
function adicionarAmigo() {
  const nomeInput = document.getElementById("amigo");
  const senhaInput = document.getElementById("senha");
  const nome = nomeInput.value.trim();
  const senha = senhaInput.value.trim();

  if (nome === "") {
    alert("Por favor, digite um nome válido!");
    return;
  }

  if (senha === "") {
    alert("Por favor, digite uma senha válida!");
    return;
  }

  const regex = /^[a-zA-Z\u00C0-\u017F\s]+$/;
  if (!regex.test(nome)) {
    alert("Por favor, digite um nome válido (apenas letras e espaços).");
    return;
  }

  if (amigos.some((amigo) => amigo.nome === nome)) {
    alert("Este nome já foi adicionado!");
    return;
  }

  // Verifica se a senha já foi utilizada
  if (amigos.some((amigo) => amigo.senha === senha)) {
    alert("Esta senha já foi utilizada. Por favor, escolha outra.");
    return;
  }

  amigos.push({
    nome: nome,
    senha: senha,
  });
  nomeInput.value = "";
  senhaInput.value = "";
  atualizarListaAmigos();
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.textContent = amigo.nome;

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
    origin: {
      y: 0.6,
    },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
  };

  confetti(config);

  setTimeout(() => {
    confetti({
      ...config,
      particleCount: 50,
      origin: {
        y: 0.7,
      },
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
      origin: {
        y: 0.6,
      },
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

  // Exibe a caixa de "Sorteando..." imediatamente
  const sorteandoContainer = document.getElementById("sorteandoContainer");
  sorteandoContainer.style.display = "block";

  let contador = 3;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ``;

  const countdownInterval = setInterval(() => {
    contador--;
    if (contador > 0) {
      resultado.innerHTML = ``;
    } else {
      resultado.innerHTML = ``;
      clearInterval(countdownInterval);
      realizarSorteio();
    }
  }, 1000);
}

function realizarSorteio() {
  if (amigos.length < 2) {
    alert("Adicione pelo menos 2 amigos para realizar o sorteio!");
    return;
  }

  const sorteandoContainer = document.getElementById("sorteandoContainer");
  const sorteandoTexto = document.getElementById("sorteandoTexto");
  const listaResultados = document.getElementById("listaResultados");

  // Verifique se os elementos existem antes de tentar modificar seus estilos
  if (!sorteandoContainer || !sorteandoTexto || !listaResultados) {
    console.error("Um ou mais elementos não foram encontrados!");
    return; // Aborta a função se algum elemento não existir
  }

  // Mostra o container "Sorteando..."
  sorteandoContainer.style.display = "block";
  listaResultados.style.display = "none";

  let amigosDisponiveis = [...amigos]; // Cria uma cópia do array de amigos para o sorteio
  let novosSorteios = []; // Array para armazenar os novos sorteios

  // Garante que cada amigo seja sorteado apenas uma vez e não tire ele mesmo
  for (let i = 0; i < amigos.length; i++) {
    const amigoSorteado = amigos[i];
    let opcoesParaSortear = amigosDisponiveis.filter(
      (amigo) => amigo.nome !== amigoSorteado.nome
    );

    // Verifica se há opções para sortear
    if (opcoesParaSortear.length === 0) {
      console.error("Não foi possível sortear! Não há opções disponíveis.");
      sorteandoContainer.style.display = "none"; // Esconde a mensagem "Sorteando..."
      document.getElementById("sortear").disabled = false; // Reabilita o botão "Sortear"
      return;
    }

    const indiceAleatorio = Math.floor(
      Math.random() * opcoesParaSortear.length
    );

    // Adicione esta verificação
    if (opcoesParaSortear[indiceAleatorio] === undefined) {
      console.error("Erro: indiceAleatorio selecionou um valor undefined.");
      return;
    }

    const sorteadoPara = opcoesParaSortear[indiceAleatorio];

    novosSorteios.push({
      de: amigoSorteado.nome,
      para: sorteadoPara.nome,
    });

    // Remove o amigo sorteado para evitar que ele seja sorteado novamente
    amigosDisponiveis = amigosDisponiveis.filter(
      (amigo) => amigo.nome !== sorteadoPara.nome
    );
  }

  // Atualiza o histórico de sorteios
  historicoSorteios = novosSorteios;

  if (audioSuspense) {
    audioSuspense.play();
  }

  let dots = "";
  let count = 0;
  const suspense = setInterval(() => {
    dots += ".";
    if (dots.length > 3) dots = "";
    sorteandoTexto.innerHTML = `Sorteando${dots}`;
    count++;

    if (count >= 5) {
      clearInterval(suspense);

      // Esconde o container "Sorteando..." e mostra a lista de resultados
      sorteandoContainer.style.display = "none";
      atualizarListaResultados();
      listaResultados.style.display = "block";

      audioSuspense.pause();
      audioSuspense.currentTime = 0;
    }
  }, 500);
}

// Função para atualizar a lista de resultados na tela
function atualizarListaResultados() {
  const listaResultados = document.getElementById("listaResultados");
  listaResultados.innerHTML = "";

  amigos.forEach((amigo) => {
    const liResultado = document.createElement("li");
    liResultado.textContent = amigo.nome;
    const btnVerificar = document.createElement("button");
    btnVerificar.textContent = "Verificar";
    btnVerificar.onclick = () => verificarResultado(amigo.nome);
    liResultado.appendChild(btnVerificar);
    listaResultados.appendChild(liResultado);
  });
}

function verificarResultado(nome) {
  const password = prompt(`Por favor, digite a senha para ${nome}:`);
  if (password === null || password.trim() === "") {
    alert("Senha inválida!");
    return;
  }

  const amigo = amigos.find((amigo) => amigo.nome === nome);

  if (amigo && password === amigo.senha) {
    // Encontre para quem o amigo sorteado deve dar o presente
    const sorteio = historicoSorteios.find((sorteio) => sorteio.de === nome);
    const sorteadoPara = sorteio ? sorteio.para : "Ninguém (erro)"; // Tratamento para caso não encontre o sorteado

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
    messageText.textContent = `🎉 ${nome} -> ${sorteadoPara}! 🎉`;

    popupContent.appendChild(closeBtn);
    popupContent.appendChild(messageText);
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);

    // Adicionar a comemoração
    dispararConfete();
    // Reproduzir o áudio de celebração
    if (audioCelebracao) {
      audioCelebracao.play();
    }
    exibirMensagemParabens(nome, sorteadoPara);
  } else {
    alert("Nome ou senha incorretos!");
  }
}

function exibirMensagemParabens(amigoSorteado, sorteadoPara) {
  const mensagem = `Parabéns ${amigoSorteado}, pode gastar seu dinheiro suado no presente para ${sorteadoPara}!`;

  // Usar a API de síntese de fala
  const utterance = new SpeechSynthesisUtterance(mensagem);
  utterance.volume = volumeMensagemFalada;
  // Define a taxa de fala (velocidade)
  utterance.rate = 1.0; // O valor padrão é 1. Valores maiores aceleram a fala, menores a tornam mais lenta

  // Reproduzir a fala
  speechSynthesis.speak(utterance);
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
  pararConfetti();
  document.getElementById("sortear").disabled = false;
}

// Função para parar o confete
function pararConfetti() {
  clearInterval(confettiInterval);
  const confettiElements = document.querySelectorAll(".confetti");
  confettiElements.forEach((confetti) => confetti.remove());
}

// Função para baixar o histórico de sorteios em TXT
function baixarHistorico() {
  let texto = "Histórico de Sorteios:\n";
  historicoSorteios.forEach((sorteio) => {
    texto += `${sorteio.de} -> ${sorteio.para}\n`;
  });

  const blob = new Blob([texto], {
    type: "text/plain",
  });
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
  sorteiosAnteriores.push({
    de: de,
    para: para,
  });
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

// Adicionar evento de clique no botão "Novo Sorteio"
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
  // carregarHistorico();
};
