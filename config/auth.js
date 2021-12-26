// module.exports = {
//   ensureAuthenticated: function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//       res.redirect('/');
//     }
//     req.flash('error_msg', 'Vui lòng đăng nhập nhập đầy đủ thông tin');
//     res.redirect('/users/login');
//   },
//   forwardAuthenticated: function(req, res, next) {
//     if (!req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/dashboard');      
//   }
// };
