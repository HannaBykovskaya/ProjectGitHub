const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const User = require('../models/user');
const mongoose = require('mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,
    {
        cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
        cookiePassword: process.env.ADMIN_COOKIE_PASS || 'Yourpassword',
        authenticate: 
        async(email, password) =>{ 

const ADMIN = await User.findOne({isAdmin:true});  
if(email === ADMIN.email && password === ADMIN.password){
return ADMIN
}return null
}});

module.exports = router