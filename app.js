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

  // Tenta reproduzir o áudio de suspense ao iniciar o sorteio (necessita interação do usuário)
  if (audioSuspense) {
    audioSuspense.play().catch((error) => {
      console.warn("Autoplay do áudio de suspense bloqueado:", error);
      // Adicionar um botão ou outra forma de interação para iniciar o áudio
    });
  }

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

      if (audioSuspense) {
        audioSuspense.pause();
        audioSuspense.currentTime = 0;
      }
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
  // Create the modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">×</span>
      <p>Por favor, digite a senha para ${nome}:</p>
      <input type="password" id="passwordInput" class="input-name">
      <div class="modal-buttons">
        <button id="okButton" class="button-add">OK</button>
        <button id="cancelButton" class="button-add">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Get references to the elements
  const passwordInput = document.getElementById("passwordInput");
  const okButton = document.getElementById("okButton");
  const cancelButton = document.getElementById("cancelButton");
  const closeButton = modal.querySelector(".close-button");

  // Event listeners for the buttons
  okButton.onclick = () => {
    const password = passwordInput.value;
    if (password === null || password.trim() === "") {
      alert("Senha inválida!");
      modal.remove();
      return;
    }

    const amigo = amigos.find((amigo) => amigo.nome === nome);

    if (amigo && password === amigo.senha) {
      // Find who the drawn friend should give the gift to
      const sorteio = historicoSorteios.find((sorteio) => sorteio.de === nome);
      const sorteadoPara = sorteio ? sorteio.para : "Ninguém (erro)"; // Treatment in case the drawn person is not found

      // Create a div element to display the result
      const resultadoDiv = document.createElement("div");
      resultadoDiv.classList.add("resultado-popup");
      resultadoDiv.innerHTML = `🎉 ${nome} -> ${sorteadoPara}! 🎉`;

      // Add class for blinking animation
      resultadoDiv.classList.add("piscar");

      // Add the popup to the document body
      document.body.appendChild(resultadoDiv);

      // Set a time to remove the popup after a few seconds
      setTimeout(() => {
        document.body.removeChild(resultadoDiv);
      }, 5000); // Remove after 5 seconds

      // Add the celebration
      dispararConfete();

      // Play the celebration audio
      if (audioCelebracao) {
        audioCelebracao.play();
      }
      exibirMensagemParabens(nome, sorteadoPara);
    } else {
      alert("Nome ou senha incorretos!");
    }
    modal.remove();
  };

  cancelButton.onclick = () => {
    modal.remove();
  };

  closeButton.onclick = () => {
    modal.remove();
  };
}

function exibirMensagemParabens(amigoSorteado, sorteadoPara) {
  if ("speechSynthesis" in window) {
    // Verifica se a API está disponível
    const mensagem = `Parabéns ${amigoSorteado}, pode gastar seu dinheiro suado para comprar o presente`;

    // Usar a API de síntese de fala
    const utterance = new SpeechSynthesisUtterance(mensagem);
    utterance.volume = volumeMensagemFalada;
    // Define a taxa de fala (velocidade)
    utterance.rate = 1.0; // O valor padrão é 1. Valores maiores aceleram a fala, menores a tornam mais lenta

    // Verifica se há vozes disponíveis
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Seleciona uma voz (por exemplo, a primeira voz disponível)
      utterance.voice = voices[0];
    }

    // Adiciona um pequeno atraso
    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 100); // Atraso de 100 milissegundos
  } else {
    console.warn(
      "A API de Text-to-Speech não está disponível neste navegador."
    );
    // Adicione um fallback (por exemplo, exibir a mensagem em um elemento HTML)
    alert(
      `Parabéns ${amigoSorteado}, pode gastar seu dinheiro suado para comprar o presente`
    );
  }
}

// Função para sortear novamente
function sortearNovamente() {
  document.getElementById("resultado").innerHTML = "";
  amigos = [];
  atualizarListaAmigos();
  historicoSorteios = [];
  const listaResultados = document.getElementById("listaResultados");
  listaResultados.innerHTML = "";

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
inicializarSons();

// Função para combinar a inicialização do particles.js e outras ações
window.onload = () => {
  particlesJS(
    "particles-js",

    {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#fff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#fff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      config_demo: {
        hide_card: false,
        background_color: "#b61924",
        background_image: "",
        enable_gradients: false,
        default_config: "Default",
        mode: "full",
      },
    }
  );
};
