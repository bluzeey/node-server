exports.getLogin = (req, res, next) => {
  console.log(req.get('Cookie'))
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated:req?.session?.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn=true
  req.session.user=req.user
  res.redirect('/')
};
