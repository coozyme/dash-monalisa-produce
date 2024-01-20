var express = require('express');
var router = express.Router();
const { GetRoles, AddRole, GetDetailPermissionRole, UpdateRole, DeleteRole } = require('../controller/management-user.js')
const { Get, Create, Update } = require('../controller/menu.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/roles', GetRoles);
router.post('/add-role', AddRole)
router.get('/role/:id', GetDetailPermissionRole)
router.put('/role/:id', UpdateRole)
router.delete('/role/:id', DeleteRole)

router.post('/add-menu', Create)
router.get('/menus', Get)
router.post('/menu/:id', Update)
// router.get('/auth', function(req, res){res.redirect('/auth/login')});

module.exports = router;
