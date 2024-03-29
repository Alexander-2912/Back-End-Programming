const {Router} = require('express')
const router = Router()
const login = require('../../models/registerDB.js')

// const TodoListItem = require('../../models/loginDB.js')

// router.post('/', async (req, res) => {
//     const = user await login.findOne({email:req.body.email})
//     if(user){
//         if(bcrypt.compare(req.body.password, user.password))
//     }
// })



// router.get('/', async (req, res) => {
//     try {
//         const todoListItems = await TodoListItem.find()
//         if (!todoListItems) {
//             return res.status(404).json({message: 'Todo list items not found'})
//         }
//         res.status(200).json(todoListItems)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //post
// router.post('/', async (req, res) => {
//     const todoListItem = new TodoListItem({
//         text: req.body.text
//     })
//     try {
//         const newTodoListItem = await todoListItem.save()
//         res.status(201).json(newTodoListItem)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// //put
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedTodoListItem = await TodoListItem.findByIdAndUpdate(req.params.id, req.body)
//         if (!updatedTodoListItem) {
//             return res.status(404).json({message: 'Todo list item not found'})
//         }
//         const update = {...updatedTodoListItem._doc, ...req.body}
//         res.status(200).json(update)
        
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// //delete
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedTodoListItem = await TodoListItem.findByIdAndDelete(req.params.id)
//         if (!deletedTodoListItem) {
//             return res.status(404).json({message: 'Todo list item not found'})
//         }
//         res.status(200).json("delete berhasil")
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })


module.exports = router