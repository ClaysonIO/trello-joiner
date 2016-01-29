FlowRouter.route('/login', {
  action: function(params, queryParams) {
    BlazeLayout.render('login');
  },
  name: "login"
});

FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('cover');
  },
  name: "cover"
});

FlowRouter.route('/boards', {
  action: function(params, queryParams) {
    BlazeLayout.render('boards');
  },
  name: "boards"
});
