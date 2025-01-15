const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expenseList = document.querySelector('ul')

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

amount.oninput = () => {
  //Expressão regular não se usa áspas
  const regex = /\D/g

  let value = amount.value.replace(regex, '')
  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })


  return value
}

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

    //Adiciona as infornmações no item
    expenseItem.append(expenseIcon)
    expenseList.append(expenseItem)

  } catch(error) {
    alert('Não foi possível atualizar sua lista de despesas.')
    console.log(error)
  }
}

