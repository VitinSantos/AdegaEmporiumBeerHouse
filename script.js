document.addEventListener("DOMContentLoaded", ()=>{

// 🔥 TODOS OS PRODUTOS (AGORA COM IMAGEM)
const todosProdutos = [

  //Produtos em Destaque//
  {nome:"Jack Daniels", categoria:"destaque", preco:120, img:"img/Whisky/JackTradicional.png"},
  {nome:"Dose de Passport", categoria:"destaque", preco:30, img:"img/Destaque/DosePassport.png"},
  {nome:"Dose de Red label", categoria:"destaque", preco:35, img:"img/Destaque/DoseRedlabel.png"},
  {nome:"Jack Daniels Fire", categoria:"destaque", preco:135, img:"img/Whisky/JackFire.png"},
  {nome:"Sex On The Beach", categoria:"destaque", preco:20, img:"img/Destaque/Sexonthebeach.png"},
  {nome:"Batida de Morango", categoria:"destaque", preco:20, img:"img/Destaque/BatidadeMorango.png"},
  {nome:"Batida de Maracujá", categoria:"destaque", preco:20, img:"img/Destaque/BatidadeMaracuja.png"},
  {nome:"Copão de Caipirinha", categoria:"destaque", preco:15, img:"img/Destaque/CaipirinhadeLimao.png"},

  // WHISKY
  {nome:"Jack Daniels", categoria:"destilados", preco:120, img:"img/Whisky/JackTradicional.png"},
  {nome:"Jack Daniels Honey", categoria:"destilados", preco:130, img:"img/Whisky/JackHoney.png"},
  {nome:"Jack Daniels Apple", categoria:"destilados", preco:135, img:"img/Whisky/JackApple.png"},
  {nome:"Jack Daniels Fire", categoria:"destilados", preco:135, img:"img/Whisky/JackFire.png"},
  {nome:"Red Label", categoria:"destilados", preco:90, img:"img/Whisky/RedLabelGarrafa.png"},
  {nome:"Black Label", categoria:"destilados", preco:120, img:"img/Whisky/BlackLabel.png"},
  {nome:"Gold Label", categoria:"destilados", preco:180, img:"img/Whisky/GoldLabel.png"},
  {nome:"Old Parr", categoria:"destilados", preco:140, img:"img/Whisky/OldParr.png"},
  {nome:"Chivas Regal", categoria:"destilados", preco:150, img:"img/Whisky/Chivas.png"},
  {nome:"Cavalo Branco", categoria:"destilados", preco:85, img:"img/Whisky/CavaloBranco2.png"},
  {nome:"PassPort", categoria:"destilados", preco:85, img:"img/Whisky/PassportGarrafa.png"},

  // CERVEJA
  {nome:"Heineken", categoria:"cerveja", preco:6, img:"img/Cerveja/Heineken.png"},
  {nome:"Corona", categoria:"cerveja", preco:8, img:"img/Cerveja/Corona.png"},
  {nome:"Budweiser", categoria:"cerveja", preco:6, img:"img/Cerveja/Budweiser.png"},
  {nome:"Skol", categoria:"cerveja", preco:5, img:"img/Cerveja/Skol.png"},
  {nome:"Brahma", categoria:"cerveja", preco:5, img:"img/Cerveja/Brahma.png"},
  {nome:"Stella Artois", categoria:"cerveja", preco:7, img:"img/Cerveja/Stella.png"},

  // VINHO
  {nome:"Pérgola Tinto", categoria:"vinho", preco:20, img:"img/Vinho/Pergola.png"},
  {nome:"Cantinho do Vale", categoria:"vinho", preco:5, img:"img/Vinho/CantinhodoVale.png"},
  {nome:"Draft", categoria:"vinho", preco:10, img:"img/Vinho/Draft.png"},

  // REFRI
  {nome:"Coca-Cola", categoria:"zeroalcol", preco:6, img:"img/Refri/Cocacola.png"},
  {nome:"Coca-Cola-Zero", categoria:"zeroalcol", preco:6, img:"img/Refri/CocaCola0.png"},
  {nome:"Guaraná", categoria:"zeroalcol", preco:5, img:"img/Refri/Guarana.png"},
  {nome:"Fanta Uva", categoria:"zeroalcol", preco:5, img:"img/Refri/FantaUva.png"},

  //Suco
  {nome:"Dell Valle Lata", categoria:"zeroalcol", preco:5, img:"img/Suco/SucoDelVallelata.png"},
  {nome:"Dell Valle Garrafa", categoria:"zeroalcol", preco:8, img:"img/Suco/SucoDelValleGarrafa.png"},
  {nome:"Suco Kapo", categoria:"zeroalcol", preco:4, img:"img/Suco/SucoKapo.png"},

  //Licor
  {nome:"Licor Baianinha", categoria:"destilados", preco:15, img:"img/Licor/LicorBaianinha.png"},

  // Combos
  {nome:"Combo Gin Rock's Tradicional", categoria:"combos", preco:52, img:"img/Combo/GinRocksTradicional.png"},
  {nome:"Combo Gin Rock's Morago", categoria:"combos", preco:52, img:"img/Combo/GinRocksMorango.png"},
];

// 🔥 HOME (8 PRODUTOS)
const produtos = todosProdutos.slice(0,8);

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
let nomeSalvo = localStorage.getItem("nomeCliente") || "";

// ================= ADD / REMOVE =================
window.add = function(nome){
  carrinho[nome] = (carrinho[nome] || 0) + 1;
  salvar();
  atualizar();
};

window.remove = function(nome){
  carrinho[nome]--;
  if(carrinho[nome] <= 0) delete carrinho[nome];
  salvar();
  atualizar();
};

// ================= SALVAR =================
function salvar(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ================= RENDER =================
function render(lista,id){
  const el = document.getElementById(id);
  if(!el) return;

  el.innerHTML = "";

  lista.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <h4>${p.nome}</h4>
      <p>R$ ${p.preco}</p>
      <button class="btn-add">Adicionar</button>
    `;

    card.querySelector("button").onclick = () => window.add(p.nome);

    el.appendChild(card);
  });
}

// ================= ATUALIZAR =================
function atualizar(){
  const lista = document.getElementById("cart-items");
  if(!lista) return;

  lista.innerHTML="";
  let total=0;
  let count=0;

  for(let item in carrinho){
    let p = todosProdutos.find(x=>x.nome===item);
    if(!p) continue;

    let qtd = carrinho[item];
    let sub = p.preco * qtd;

    total += sub;
    count += qtd;

    lista.innerHTML += `
      <li>
        <strong>${item}</strong><br>
        ${qtd}x R$ ${p.preco} = <b>R$ ${sub}</b>
        <div class="controls">
          <button onclick="remove('${item}')">-</button>
          <span>${qtd}</span>
          <button onclick="add('${item}')">+</button>
        </div>
      </li>
    `;
  }

  document.getElementById("total").innerText = "Total: R$ " + total;
  document.getElementById("cart-count").innerText = count;
}

// ================= FINALIZAR =================
window.finalizar = function(){

  const nome = document.getElementById("nome").value;
  const pagamento = document.getElementById("pagamento").value;
  const horario = document.getElementById("horario").value;

  if(!nome){
    alert("Preencha seu nome!");
    return;
  }

  localStorage.setItem("nomeCliente", nome);

  let total = 0;
  let texto = `Pedido:%0ACliente: ${nome}%0A%0A`;

  for(let item in carrinho){
    let p = todosProdutos.find(x=>x.nome===item);
    let qtd = carrinho[item];
    let sub = p.preco * qtd;

    total += sub;

    texto += `${item} - ${qtd}x R$ ${p.preco} = R$ ${sub}%0A`;
  }

  texto += `%0ATotal: R$ ${total}%0A`;
  texto += `%0AForma de pagamento: ${pagamento}%0AHorário: ${horario}`;

  window.open(`https://wa.me/5511943906039?text=${texto}`);

  carrinho = {};
  salvar();
  atualizar();

  document.getElementById("horario").value = "";
};

// ================= FILTRO =================
window.filtrar = function(cat){
  if(cat==="todos") return render(todosProdutos,"catalogo");
  render(todosProdutos.filter(p=>p.categoria===cat),"catalogo");
};

// ================= UI =================
const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const overlay = document.getElementById("overlay");

cartBtn?.addEventListener("click", ()=>{
  cart.classList.add("active");
  overlay.classList.add("active");

  document.getElementById("nome").value = nomeSalvo;
});

overlay.addEventListener("click", (e)=>{
  if(e.target === overlay){
    cart.classList.remove("active");
    overlay.classList.remove("active");
  }
});

document.getElementById("close-cart").addEventListener("click", ()=>{
  cart.classList.remove("active");
  overlay.classList.remove("active");
});

// 🔥 ATIVAR BOTÃO DE FILTRO (NOVO)
// 🔥 ATIVAR BOTÃO DE FILTRO + PADRÃO "TODOS"
const botoesFiltro = document.querySelectorAll(".filtros-centro button");

botoesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {

    botoesFiltro.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");

  });
});

// 🔥 DEFINE "TODOS" COMO ATIVO AO CARREGAR
const botaoTodos = [...botoesFiltro].find(b => b.textContent.toLowerCase() === "todos");

if(botaoTodos){
  botaoTodos.classList.add("ativo");
}

// ================= INIT =================
render(produtos,"produtos");
render(todosProdutos,"catalogo");
atualizar();

});