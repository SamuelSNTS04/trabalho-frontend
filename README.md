# 🎬 CineKeep

O **CineKeep** é uma aplicação web desenvolvida para cinéfilos e entusiastas de séries que desejam organizar, categorizar e gerenciar seus títulos favoritos em um só lugar.

O projeto foi construído utilizando uma abordagem **Mobile First**, garantindo uma experiência de uso fluida, moderna e totalmente responsiva, adaptando-se perfeitamente desde telas de celulares até monitores desktop.

---

## 🚀 Funcionalidades Principais

* **Catálogo Inteligente:** Listagem de filmes e séries organizada por categorias.
* **Minha Lista Personalizada:** Acompanhamento do progresso de cada título através de status dinâmicos (*Quero Assistir*, *Assistindo*, *Assistido* e *Não Quero Mais Assistir*).
* **Cards Expansíveis:** Exibição detalhada de informações como sinopse e ano de lançamento diretamente no card do filme de forma interativa.
* **Cadastro Completo:** Formulário padronizado e validado para a adição de novos títulos com busca inteligente de imagem de capa.
* **Roteamento Seguro:** Sistema de rotas privadas e públicas, incluindo uma página personalizada e humorada para erros de navegação (404).
* **Layout Responsivo:** Interface adaptada para dispositivos móveis, tablets e desktops.

---

## 🛠️ Tecnologias Utilizadas

* **React** — Biblioteca para construção da interface.
* **Vite** — Ferramenta de build e desenvolvimento rápida e moderna.
* **React Router DOM** — Gerenciamento de rotas e navegação.
* **React Hook Form** — Manipulação e validação de formulários.
* **Tailwind CSS** — Estilização utilitária com foco em responsividade.
* **JSON Server** — Simulação de uma API REST para persistência dos dados.

---

## 📂 Estrutura do Projeto

```text
src/
├── assets/
├── components/
├── pages/
├── routes/
├── services/
├── hooks/
├── styles/
├── App.jsx
└── main.jsx
```

---

## 💻 Como Inicializar o Projeto

Siga os passos abaixo para executar a aplicação localmente.

### Pré-requisitos

Antes de começar, você precisará ter instalado:

* Node.js (versão 18 ou superior recomendada)
* npm (já incluído no Node.js)

---

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/SamuelSNTS04/trabalho-frontend.git
```

```bash
cd trabalho-frontend
```

---

### 2️⃣ Instalar as Dependências

```bash
npm install
```

---

### 3️⃣ Iniciar o Servidor Back-end (JSON Server)

```bash
npm run server
```

Por padrão, a API mock será executada em:

```text
http://localhost:3000
```

---

### 4️⃣ Iniciar o Front-end

```bash
npm run dev
```

Após a execução, o terminal exibirá um endereço local semelhante a:

```text
http://localhost:5173
```

Abra essa URL em seu navegador para acessar o projeto.

---

## 📌 Comandos Úteis

| Comando           | Descrição                                 |
| ----------------- | ----------------------------------------- |
| `npm install`     | Instala todas as dependências do projeto  |
| `npm run dev`     | Inicia o ambiente de desenvolvimento      |
| `npm run server`  | Inicia o JSON Server                      |
| `npm run build`   | Gera a versão otimizada para produção     |
| `npm run preview` | Visualiza localmente a versão de produção |

---

## 🏗️ Arquitetura e Integrações

O projeto segue uma arquitetura baseada em componentes reutilizáveis, promovendo:

* Organização e escalabilidade do código.
* Separação de responsabilidades.
* Facilidade de manutenção.
* Reutilização de componentes.

Exemplo:

* TMDB API
* OMDb API

---

## 👨‍💻 Autores

Desenvolvido por **Samuel Magalhães**e
**Daniel Pacheco**

### Contatos

* GitHub: https://github.com/SamuelSNTS04
* GitHub: https://github.com/DanielPAmorim
