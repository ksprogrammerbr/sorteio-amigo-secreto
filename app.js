// 1. Adicionar Nomes à Lista
// O que será feito?
// Criar um array para armazenar os nomes.
// Capturar a entrada do usuário e adicionar o nome ao array.
// Exibir os nomes na tela.
// Impedir entradas vazias.

// Selecionando os elementos do DOM

const nomeInput = document.getElementById("nome"); // Selecionar o campo da entrada do usuário
const adicionarBotao = document.getElementById("adicionar"); // Selecionar o botao de adicionar
const listaNomes = document.getElementById("lista-nomes"); // Selecionar o campo da lista de nomes

let nomes = []; // Array para armazenar os nomes

// Função para adicionar um nome à lista

function adicionarNome() {
  const nome = nomeInput.value.trim(); // Pegar o valor do campo do usuário

  if (nome === "") {
    alert("Por favor, insira um nome válido.");
    return;
  }

  nomes.push(nome);
  atualizarLista();
  nomeInput.value = ""; // Limpar o campo de entrada
}

// Atualizar a exibição da lista

function atualizarLista() {
  listaNomes.innerHTML = ""; // Limpar a lista antres de atualizar

  nomes.forEach((nome, index) => {
    const item = document.createElement("li"); //  Cria um elemento <li>
    item.textContent = nome; // Define o texto do <li> como o nome do array
    listaNomes.appendChild(item); // Adiciona o <li> dentro da lista
  });
}

// Evento de clique no botão Adicionar

adicionarBotao.addEventListener("click", adicionarNome);
