const nomeDb = "Estoque";
const setLocalStorage = () => {
  localStorage.setItem(nomeDb, JSON.stringify(dadosDB));
};
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(nomeDb)) ?? [];
};
// Criar - C
const criarProduto = (produto) => {
  dadosDB.push(produto);
  setLocalStorage();
};
// Read (ler) - R
const dadosDB = getLocalStorage();
// Update - U
const editar = (indice, codigo, descricao) => {
  dadosDB[indice].codigo = codigo;
  dadosDB[indice].descricao = descricao;
  setLocalStorage();
};
// Deletar - D
const deletar = (i) => {
  dadosDB.splice(i, 1);
  setLocalStorage();
};

//Seleciona input codigo e descrição
const inptCodigo = document.querySelector("#codigo");
const inptDescricao = document.querySelector("#descricao");
//Limpa input
const limpaInput = () => {
  inptCodigo.value = "";
  inptDescricao.value = "";
  inptCodigo.focus();
};
//Salva Produto
const salvarProduto = () => {
  const produto = {
    codigo: inptCodigo.value,
    descricao: inptDescricao.value,
  };
  criarProduto(produto);
  limpaInput();
  limparLista();
  atualizarLista();
  location.reload();
};
//adiciona no botao salvar
document.querySelector("#salvar").addEventListener("click", salvarProduto);

//Seleciona a lista
const listaDados = document.querySelector("#lista-dados");
//Cria os itens da lista + botoes
const criaLi = () => {
  const btn = document.createElement("button");
  btn.innerText = "Editar";
  btn.classList.add("editar");
  const btn2 = document.createElement("button");
  btn2.classList.add("excluir");
  btn2.innerText = "Excluir";
  const li = document.createElement("li");
  li.appendChild(btn);
  li.appendChild(btn2);
  listaDados.appendChild(li);
};

//Exclui listas
const limparLista = () => {
  const li = listaDados.querySelectorAll("li");
  li.forEach((l) => l.parentNode.removeChild(l));
};
//Atualizar lista
const atualizarLista = () => {
  limparLista();
  dadosDB.forEach(criaLi);
  const liListaDados = listaDados.querySelectorAll("li");
  for (let i = 0; i < dadosDB.length; i++) {
    liListaDados[i].innerHTML += dadosDB[i].codigo + " " + dadosDB[i].descricao;
  }
};
for (let i = 0; i < dadosDB.length; i++) {
  criaLi();
}
const liListaDados = listaDados.querySelectorAll("li");
for (let i = 0; i < dadosDB.length; i++) {
  liListaDados[i].innerHTML += dadosDB[i].codigo + " " + dadosDB[i].descricao;
}

const excluir = document.querySelectorAll(".excluir");

for (let i = 0; i < liListaDados.length; i++) {
  liListaDados[i].addEventListener("click", (e) => {
    if (e.target.classList.contains("excluir")) {
      console.log(i);
      deletar(i);
      atualizarLista();
      location.reload();
    }
  });
}
for (let i = 0; i < liListaDados.length; i++) {
  liListaDados[i].addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
      const cod = prompt("Codigo");
      const desc = prompt("Descrição");
      console.log(i);
      editar(i, cod, desc);
      atualizarLista();
      location.reload();
    }
  });
}
