const express = require("express")
const app = express()
const PORT = 3456

app.set("view engine", "ejs")
app.use(express.urlencoded());

const todoList = [
    {
        id:1,
        task: "teach CRUD",
        description: "have fun doing it",
        isComplete: false,
        date: "2023/07/11"
    },
    {   
        id:2,
        task: "have coffee",
        description: "yum",
        isComplete: false,
        date: "2023/07/11"
    },
    {
        id:3,
        task: "eat lunch",
        description: "I had a salad",
        isComplete: true,
        date: "2023/07/10"
    }

]

app.set('view engine', 'ejs')

app.get('/todos', (req, res) => {
    const templateVars = { todos: todoList}
    console.log(templateVars)
    res.render("todos", templateVars)
})

app.get('/todos/:todo_id', (req, res) => {
    const todo_id = req.params.todo_id
    console.log(req.params)
    const currentTodo = todoList.find(item => item.id === +todo_id)
    return res.render("todo", {todo: currentTodo})
})

app.post("/todos/:todo_id", (req, res) => {
    const { todo_id } = req.params;
    const { task, description, isComplete } = req.body;
    let currentTodo = todoList.find(item => item.id === +todo_id)
    currentTodo.task=task
    currentTodo.description = description
    currentTodo.isComplete = isComplete
    console.log(todoList)
    return res.redirect(`/todos`);
  });

app.post('/todos', (req,res) => {
    const { task, description, isComplete } = req.body;
    newTodo = {
        id: Date.now(),
        task: task,
        description: description,
        isComplete: false

    }
    todoList.push(newTodo)
    return res.redirect(`/todos`);
})

app.get('/', (req, res) => {
    return res.send('Hello Nurse!!')
})

app.listen(PORT, () => console.log(`running up that hill on ${PORT}`))
