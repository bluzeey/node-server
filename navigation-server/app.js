const path = require('path');

const express = require('express');

const app = express();
const mongoConnect=require('./util/database').mongoConnect

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use((req, res, next) => {
//   res.status(404).render('404',{ pageTitle: 'Page Not Found' });
// });

mongoConnect(()=>app.listen(3000))