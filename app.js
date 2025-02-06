// Selecionar elementos
const inputName = document.getElementById("amigo");
const adicionarBtn = document.querySelector(".button-add");
const listaNomes = document.getElementById("listaAmigos");
const sortearBtn = document.querySelector(".button-draw");
const resultado = document.getElementById("resultado");
const audio = new Audio("assets/sorteio.mp3");

let nomes = JSON.parse(localStorage.getItem("nomes")) || [];

// Atualizar a lista ao carregar a página
atualizarLista();

// Função para adicionar nome
function adicionarNome() {
  const nome = inputName.value.trim();
  if (nome === "") {
    alert("Por favor, insira um nome válido.");
    return;
  }

  if (nomes.includes(nome)) {
    alert("Esse nome já foi adicionado, Por favor! Insira outro nome");
    return;
  }

  nomes.push(nome);
  localStorage.setItem("nomes", JSON.stringify(nomes)); // Salvar localmente
  atualizarLista();
  inputName.value = "";
}

// Atualizar lista de nomes
function atualizarLista() {
  listaNomes.innerHTML = "";
  nomes.forEach((nome, index) => {
    const item = document.createElement("li");
    item.textContent = nome;

    // Botão para remover nome
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.classList.add("remove-btn");
    btnRemover.addEventListener("click", () => removerNome(index));

    item.appendChild(btnRemover);
    listaNomes.appendChild(item);
  });
}

// Remover nome da lista
function removerNome(index) {
  nomes.splice(index, 1);
  localStorage.setItem("nomes", JSON.stringify(nomes));
  atualizarLista();
}

// **NOVO EFEITO DE CONFETE**
function confettiEffect() {
  const duration = 3 * 1000; // Tempo total do efeito
  const animationEnd = Date.now() + duration;
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];

  function frame() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return;
    }

    confetti({
      particleCount: 7,
      angle: Math.random() * 360,
      spread: 80,
      startVelocity: 30,
      colors: colors,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    });

    requestAnimationFrame(frame);
  }

  frame();
}

// **Animação de suspense para o sorteio**
function animateDraw(callback) {
  let i = 0;
  let interval = setInterval(() => {
    resultado.innerHTML = `🎲 Sorteando: ${nomes[i % nomes.length]} 🎲`;
    i++;
    if (i > nomes.length * 2) {
      clearInterval(interval);
      callback();
    }
  }, 150);
}

// **Função de sorteio**
function sortearNome() {
  if (nomes.length < 2) {
    alert("Adicione pelo menos dois nomes para sortear.");
    return;
  }

  audio.play();
  animateDraw(() => {
    const indiceSorteado = Math.floor(Math.random() * nomes.length);
    const nomeSorteado = nomes[indiceSorteado];

    resultado.innerHTML = `🎉 O amigo secreto sorteado é: ${nomeSorteado} 🎉`;

    // Chamar o efeito de confete somente após o resultado ser exibido
    confettiEffect();
  });
}

// Eventos
adicionarBtn.addEventListener("click", adicionarNome);
sortearBtn.addEventListener("click", sortearNome);
inputName.addEventListener("keypress", (event) => {
  if (event.key === "Enter") adicionarNome();
});
