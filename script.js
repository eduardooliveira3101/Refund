const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expenseList = document.querySelector('ul')
const expenseQuantity = document.querySelector('aside header p span')

const expenseTotal = document.querySelector('aside header h2')

console.log(expenseQuantity)

//Evento no qual vai ser disparado quando o formulário for enviado
form.onsubmit = (event) => {
  //Previne o evento padrão do formulário
  event.preventDefault()
  //Criação e captura de evento do submit para obter os valores dentro de um objeto
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

  //Função que vai criar e jogar um 
  expenseAdd(newExpense)


}

//Evento no qual vai ser disparado quando o input for clicado
amount.oninput = () => {
  //Expressão regular não se usa áspas
  const regex = /\D/g

  let value = amount.value.replace(regex, '')
  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value)
}

//Formatando o valor para real BRL
function formatCurrencyBRL(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })


  return value
}

//Criando um novo item dentro da lista
function expenseAdd(newExpense) {
  try {

    //Criando o elemento para adicionar na lista

    //Criando a lista
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    //Criando o icone da categoria
    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    //Div encapsuladora
    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-info')

    //Criando nome
    const expenseName = document.createElement('strong')
    expenseName.textContent = newExpense.expense

    //Categoria da despesa 
    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    //Criando o valor da despesa
    const expenseAmount = document.createElement('span')
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`

    //Criando o icone de remover
    const removeIcon = document.createElement('img')
    removeIcon.classList.add('remove-icon')
    removeIcon.setAttribute('src', 'img/remove.svg')
    removeIcon.setAttribute('alt', 'Remover')

    //Adicionando elemento de nome e categoria dentro da Div encapsuladora
    expenseInfo.append(expenseName, expenseCategory)

    //Adiciona as infornmações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount,removeIcon)

    //A lista recebe um novo item 
    expenseList.append(expenseItem)

    //Atualiza o indice de quantos elementos encontra-se na lista
    updateTotals()

  } catch(error) {
    alert('Não foi possível atualizar sua lista de despesas.')
    console.log(error)

  }
}

//Atualizando os totais.
function updateTotals() {
  try {
    //Recupera todos os items da lista e os contabiliza.
    //Aqui ele recuperou o total de itens que possui dentro da lista UL
    const itens = expenseList.children
  
    //Atualizando a quantidade de items na lista
    //Aqui ele está pegando o contador 
    expenseQuantity.textContent = `${itens.length} ${itens.length > 1 ? 'despesas' : 'despesa'}`
  
    //variavel para incrementar o total
    let total = 0

    //Pencorrer cada item (li) da lista (ul)
    for (let item = 0; item < itens.length; item++) {
      const itemAmount = itens[item].querySelector('.expense-amount')

      //Remover caracteres não numericos e substiitui a virgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d]/g,'').replace(',', '.')

      //Converter o valor para float
      value = parseFloat(value)

      //Verificar se é um numero válido
      if(isNaN(value)) {
        return alert('Não foi possível calcular o total. O valor não parece ser um número')
      }

      //Incrementa o valor total
      total += Number(value)
    }

    expenseTotal.textContent = total

  } catch (error) {
    console.log(error)
    alert('Não foi possível atualizar os totais')
  }
}
