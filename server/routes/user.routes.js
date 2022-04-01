const UserController = require("../controllers/user.controller")
const {authenticate} = require('../config/jwt.config')

module.exports = app =>{
    app.get(`/api/user/:id`, authenticate, UserController.oneUser)
    app.get(`/api/sorting`,  authenticate, UserController.oneUser)
    app.get(`/api/all/users`, UserController.index)
    app.get(`/api/cookie`, UserController.cookie)
    app.post(`/api/register`, UserController.register)
    app.post(`/api/login`, UserController.login)
    app.get(`/api/logout`, UserController.logout)
}