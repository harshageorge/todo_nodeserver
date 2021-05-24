const db = require('./db');


const gettodos = () => {
    return db.Todos.find().then(user => {
        if (user) {
            return {
                statusCode: 200,
                id: user.id,
                title: user.title
            }
        }
        else {
            return {
                status: false,
                statusCode: 422,
                message: "todos doesnt exist."
            }
        }

    })
}

const gettodo = (id) => {
    return db.Todos.findOne({
        order: id
    }).then(user => {
        // console.log(user)
        if (user) {
            return {
                statusCode: 200,
                title: user.title,
                id: user.order

            }
        }
        else {
            return {
                status: false,
                statusCode: 422,
                message: "todo doesnt exist."
            }
        }
    })
}

const addtodo = (order, title) => {
    return db.Todos.findOne({
        order
    }).then(user => {
        // console.log(user)
        if (user) {
            return {
                status: false,
                statusCode: 422,
                message: "todo already exist."
            }
        }
        else {
            const newTodo = new db.Todos({
                order,
                title

            });
            newTodo.save();
            return {
                status: true,
                statusCode: 200,
                message: "successfully added"

            }
        }
    })


}

const edittodo = (order, title) => {
    return db.Todos.findOne({
        title: title
    }, { _id: 0 }).sort({ "order": 1 }).then(user => {
        if (user) {
            user.order = order;
            user.save();
            return {
                statusCode: 200,
                order: user.order,
                title: user.title,
                message: "successfully updated"
            }

        }
        else {
            return {
                status: false,
                statusCode: 422,
                message: "todo doesnt exist."
            }

        }
    })

}

const deletetodo = id => {
    return db.Todos.deleteOne({
        order: id
    }).then(user => {

        if (!user) {
            return {
                status: false,
                statusCode: 422,
                message: "permission denied",

            }
        }
        return {
            status: true,
            statusCode: 200,
            message: "Todo deleted successfully"

        }
    })
}

module.exports = {

    gettodo,
    addtodo,
    deletetodo,
    edittodo, 
    gettodos
}