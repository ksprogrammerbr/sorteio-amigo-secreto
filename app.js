// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar amigo à lista
function adicionarAmigo() {
  // Pegar o valor do input
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  // Validar se o campo está vazio
  if (nome === "") {
    alert("Por favor, digite um nome válido!");
    return;
  }

  // Adicionar o nome ao array
  amigos.push(nome);

  // Limpar o input
  input.value = "";

  // Atualizar a lista na tela
  atualizarListaAmigos();
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  // Criar um item de lista para cada amigo
  amigos.forEach((amigo) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    lista.appendChild(li);
  });
}

// Função para disparar o efeito de confete
function dispararConfete() {
  const config = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
  };

  confetti(config);

  // Dispara mais confetes após um pequeno delay para criar um efeito mais duradouro
  setTimeout(() => {
    confetti({
      ...config,
      particleCount: 50,
      origin: { y: 0.7 },
    });
  }, 250);
}

// Função para sortear um amigo
function sortearAmigo() {
  // Verificar se há amigos suficientes para sortear
  if (amigos.length < 2) {
    alert("Adicione pelo menos 2 amigos para realizar o sorteio!");
    return;
  }

  // Gerar um índice aleatório
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);

  // Pegar o amigo sorteado
  const amigoSorteado = amigos[indiceAleatorio];

  // Limpar resultado anterior
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  // Criar efeito de suspense
  let dots = "";
  let count = 0;
  const suspense = setInterval(() => {
    dots += ".";
    if (dots.length > 3) dots = "";
    resultado.innerHTML = `<li>Sorteando${dots}</li>`;
    count++;

    if (count >= 5) {
      clearInterval(suspense);
      // Exibir o resultado com animação
      resultado.innerHTML = `<li>🎉 ${amigoSorteado} foi sorteado(a)! 🎉</li>`;
      // Disparar confete
      dispararConfete();
    }
  }, 500);
}

// Adicionar evento de tecla Enter no input
document.getElementById("amigo").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adicionarAmigo();
  }
});
