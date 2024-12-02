const { validateUserInput, handleValidationErrors } = require('../Config/Validation/user');
const { CreateUser, getAllUser } = require('../Controller/user');

const UserRoutes=require('express').Router()


UserRoutes.post('/create',validateUserInput,handleValidationErrors,CreateUser)
UserRoutes.get('/getall',getAllUser)

module.exports=UserRoutes;