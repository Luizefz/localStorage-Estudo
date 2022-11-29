const form = document.getElementById("novoItem");
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || [];

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']

    const existe = itens.find(element => element.nome == nome.value)


    if (!nome.value || !quantidade.value) {
        alert("Preencha todos os campos")

    } else {
        const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
        }


        if (existe) {
            itemAtual.id = existe.id
            atualizaElemento(itemAtual)
            itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        } else {
            itemAtual.id = itens.length

            criaElemento(itemAtual)

            itens.push(itemAtual)
        }

        localStorage.setItem("itens", JSON.stringify(itens))
        limparInput()
    }
})

function limparInput() {
    nome.value = ""
    quantidade.value = ""

}

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeletar(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

itens.forEach((element) => {
    criaElemento(element)
    // console.log(element.nome, element.quantidade)
});

function botaoDeletar(id) {
    const elemetoBotao = document.createElement("button")
    elemetoBotao.innerText = "X"

    elemetoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elemetoBotao

}

function deletaElemento(item, id) {
    item.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}