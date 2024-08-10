const localStorageName = 'to-do-list-cn'

// Função para validar se a nova tarefa já existe
function validateIfExistNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let inputValue = document.getElementById('input-new-task').value
    let existe = values.find(x => x.name == inputValue)
    return !existe ? false : true
}

// Função para adicionar uma nova tarefa
function newTask() {
    let input = document.getElementById('input-new-task')

    // Validação
    if(!input.value) {
        alert('Digite uma tarefa para adicionar em sua lista!')
    }
    else if(validateIfExistNewTask()) {
        alert('Esta tarefa já existe!')
    }
    else {
        // Incrementação para localStorage
        let values = JSON.parse(localStorage.getItem(localStorageName) || '[]')
        values.push({
            name:input.value,
            concluded:false
        })
        localStorage.setItem(localStorageName,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

//Mostrar os valores da localStorage
function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++) {
        list.innerHTML += `
            <li class="${values[i]['concluded'] ? 'concluded' : ''}">
                <span>${values[i]['name']}</span>
                <div class="task-buttons">
                    <button id='btn-ok' onclick='checkItem("${values[i]['name']}")'>✓</button>
                    <button id='btn-del' onclick='removeItem("${values[i]['name']}")'>🗑️</button>
                </div>
            </li>`
    }
}

//Remover uma tarefa
function removeItem(name) {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == name)
    values.splice(index, 1)
    localStorage.setItem(localStorageName, JSON.stringify(values))
    showValues()
}

//Marcar uma tarefa como concluída
function checkItem(name) {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == name)
    if (index !== -1) {
        values[index].concluded = !values[index].concluded // Alterna entre true e false
        localStorage.setItem(localStorageName, JSON.stringify(values))
        showValues()
    }
}
showValues()
