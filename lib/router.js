
Authenticated = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [
    function(context){
      if(Meteor.loggingIn() || Meteor.userId()){
        route = FlowRouter.current()
      } else {
        FlowRouter.go('main');
      }
    }
  ]
})

FlowRouter.route('/login', {
  action: function(params, queryParams) {
    BlazeLayout.render('login');
  },
  name: "login"
});

FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('login');
  },
  name: "main"
});

Authenticated.route('/boards', {
  action: function(params, queryParams) {
    BlazeLayout.render('boards');
  },
  name: "boards"
});
