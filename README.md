# 🎁 Amigo Secreto Web App

Este é um aplicativo web simples para realizar sorteios de **Amigo Secreto**! 🏆 Ele permite adicionar participantes, realizar o sorteio e verificar os resultados com segurança. 🔒 projetado para modernizar a tradicional brincadeira de amigo secreto. Em vez de sortear nomes em papéis, a aplicação permite que cada participante insira seu nome e realize o sorteio digitalmente.

---

## ✨ Funcionalidades

### ✅ **Adicionar Amigos**
🔹 Permite adicionar nomes de participantes à lista do sorteio.  
🔹 Requer um **nome** e uma **senha única** para cada participante.  
🔹 **Validações:**  
   - ❌ Nomes não podem ser vazios.
   - 🔤 Apenas letras e espaços são permitidos.
   - 🔄 Nomes não podem ser repetidos.
   - 🔑 Senhas devem ser únicas e não vazias.

### 📋 **Listar Amigos**
👀 Exibe a lista de amigos adicionados.  
🗑️ Permite remover amigos da lista.

### 🎲 **Realizar Sorteio**
🎯 O sorteio é feito de forma **aleatória e justa**.  
🚫 Garante que nenhum participante tire a si mesmo.  
📢 Usa **animação de suspense** e efeitos sonoros.  
🎉 Apresenta **confetes** ao revelar os resultados!

### 🔍 **Verificar Resultado**
🔐 Cada participante insere sua senha para ver seu amigo secreto.  
📢 A API **Text-to-Speech** anuncia o resultado.  
🎊 **Efeito de confete** e **som de celebração** ao revelar!

### 🔄 **Novo Sorteio**
🧹 Limpa a lista de amigos e o histórico para um novo sorteio.

### 📥 **Baixar Histórico**
💾 Permite baixar o histórico do sorteio em um arquivo **.TXT**.

### 🎇 **Animações e Sons**
💥 **Confetes** ao final do sorteio e **partículas visuais** ao fundo.
🎶 Efeitos sonoros para criar mais emoção!

---

## 🚀 Como brincar

1️⃣ **Adicionar Participantes:** Informe nome e senha e clique em "Adicionar".  
2️⃣ **Realizar o Sorteio:** Clique no botão "Sortear" e aguarde.  
3️⃣ **Verificar Resultado:** Cada participante insere sua senha para descobrir seu amigo secreto.  
4️⃣ **Novo Sorteio:** Clique em "Novo Sorteio" para recomeçar.  
5️⃣ **Baixar Histórico:** Clique em "Baixar Histórico" para salvar os dados.

---

## 📂 Estrutura dos Arquivos

📌 `app.js` → Lógica principal do aplicativo.  
📌 `index.html` → Estrutura da página web.  
📌 `style.css` → Estilização do aplicativo.  
📌 `assets/suspense.mp3` → Som de suspense.  
📌 `assets/celebracao.mp3` → Som de celebração.  
📌 `particles.js` → Biblioteca de efeitos visuais.  
📌 `confetti.js` → Biblioteca de confetes.

---

# 🛠️ Como Usar o Repositório no GitHub

### 1️⃣ Clone o repositório:
   ```bash
git clone git@github.com:ksprogrammerbr/sorteio-amigo-secreto.git
 ```
### 2️⃣ Acesse o diretório do projeto:
   ```bash
cd sorteio-amigo-secreto
 ```
### 4️⃣ Abra o arquivo index.html no navegador ou utilize um servidor local:

### 5️⃣ Para contribuir:

Crie um branch para suas alterações:
 ```bash
git checkout -b minha-nova-feature
 ```
Faça suas modificações e commite:
 ```bash
git commit -m "Adicionando nova funcionalidade"
 ```
Envie suas alterações para o repositório:
 ```bash
git push origin minha-nova-feature
 ```
Abra um Pull Request no GitHub.

Agora você está pronto para usar e contribuir com o repositório! 🚀

---

## Idiomas Suportados

- Português (Brasil)

---
## 📷 Layout

![image](https://github.com/user-attachments/assets/8ebba073-18b7-4a7d-a3bc-72fa4dbfadd4)

## 🎥 Assista ao vídeo Explicativo

https://github.com/user-attachments/assets/ef71408f-a0e4-408d-9293-a100c1e24f14

---

## 🔍 Observações

⚠️ Alguns navegadores podem bloquear o **autoplay de áudio**. 
⚠️ A API de **Text-to-Speech** pode não funcionar em todos os navegadores.
⚠️ As senhas **não são armazenadas** permanentemente; apenas na memória do navegador.
⚠️ O histórico de sorteios é salvo no **localStorage**.

---

## 📌 Dependências

🔹 **particles.js** → [GitHub](https://github.com/VincentGarreau/particles.js/)  
🔹 **confetti-js** → [NPM](https://www.npmjs.com/package/canvas-confetti)
