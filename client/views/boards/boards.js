Template.boards.onCreated(function(){
  this.sourceBoards = new ReactiveVar([]);
  this.targetBoard = new ReactiveVar("");
})

Template.boards.helpers({
  allBoards: function(){
    return Boards.find({owner_id: Meteor.userId()}, {sort:{name:1}})
  },
  isSelectedSource: function(){
    var sourceBoards = Template.instance().sourceBoards.get();
    return (sourceBoards.indexOf(this._id) > -1) ? "btn-success" : "btn-default";
  },
  isSelectedTarget: function(){
    var targetBoard = Template.instance().targetBoard.get();
    return (targetBoard.indexOf(this._id) > -1) ? "btn-primary" : "btn-default";
  }
})

Template.boards.events({
  "click #trelloLogin": function(){
    var authenticationSuccess = function() { console.log("Successful authentication"); };
    var authenticationFailure = function() { console.log("Failed authentication"); };
    Trello.setKey(Meteor.settings.public.trello.key)
    Trello.authorize({
      type: "popup",
      name: "Getting Started Application",
      scope: {
        read: true,
        write: true },
      expiration: "never",
      success: authenticationSuccess,
      error: authenticationFailure
    });
  },
  "click #getBoards": function(){
    getBoards();
    //     console.log(Trello.members.get());
  },
  "click .selectSourceBoard": function(e){
    var sourceBoards = Template.instance().sourceBoards.get();
    var board_id = $(e.currentTarget).closest('tr').data('board_id');
    if(sourceBoards.indexOf(board_id) > -1){
      sourceBoards.splice(sourceBoards.indexOf(board_id), 1);
    } else {
      sourceBoards.push(board_id);
    }
    Template.instance().sourceBoards.set(sourceBoards);
  },
  "click .selectTargetBoard": function(e){
    var board_id = $(e.currentTarget).closest('tr').data('board_id');
    Template.instance().targetBoard.set(board_id);
  },
  "click #fillTarget": function(e){
    fillTarget();
  }

})

var fillTarget = function(){
  var targetBoard = Boards.findOne({_id: Template.instance().targetBoard.get()});
  getBoardLists(targetBoard);

  var selectedBoards = Boards.find({_id: {$in: Template.instance().sourceBoards.get()}});
  selectedBoards.forEach(function(doc){
    Trello.boards.get(doc.idBoard + "/lists", function(result, error){
      if (error != 'success'){
        console.log(error);
      } else {
        var cardArray = [];

        for(var i = 0; i < result.length; i ++){
          cardArray.push({
            cardName: result[i].name,
            boardName: doc.name,
            sourceIdBoard: doc.idBoard
          })
        }

        if(targetBoard){
          console.log(targetBoard);
          //Check to see if there's already a list on this board
          var thisList = Lists.findOne({idBoard: targetBoard.idBoard, name: doc.name});
          if(thisList){
            addCards(thisList.idList, cardArray);
          } else {
            Trello.post("/lists/", {name: doc.name, idBoard: targetBoard.idBoard}, function(result, error){
              Meteor.call('upsertList', {
                idList: result.id,
                name: result.name,
                idBoard: result.idBoard
              });
              addCards(result.id, cardArray);
            })
          }
        }
      }
    })
  })
}

var addCards = function(idList, cardArray){
  for(var i = 0; i < cardArray.length; i++){
    console.log(cardArray[i]);
    var sourceIdBoard = cardArray[i].sourceIdBoard;
    var thisCard = Cards.findOne({name: cardArray[i].cardName, sourceIdBoard: cardArray[i].sourceIdBoard})
    if(thisCard){

    } else {
      Trello.post("/cards/", {name: cardArray[i].cardName, idList: idList, due: null, urlSource: null}, function(result, error){
        Meteor.call('upsertCard', {
          idCard: result.id,
          idList: idList,
          sourceIdBoard: sourceIdBoard,
          name: result.name,
          desc: ""
        });
      })
    }
  }
}

var getBoardLists = function(board){
  Trello.boards.get(board.idBoard + "/lists", function(result, error){
    for(var i = 0; i < result.length; i ++){
      console.log(result);
      Meteor.call('upsertList', {
        idList: result[i].id,
        name: result[i].name,
        idBoard: result[i].idBoard
      });
    }
  })
}

var getBoards = function(){
  Trello.members.get('me', function(result, err){
    console.log("ERROR", err)
    console.log("RESULT", result)
    //Get all of the boards
    for(var i = 0; i < result.idBoards.length; i++){
      Trello.boards.get(result.idBoards[i], function(resultBoard, errBoard){
        console.log(resultBoard);
        if(!resultBoard.closed){
          Meteor.call('upsertBoard', {
            owner_id: Meteor.userId(),
            idBoard: resultBoard.id,
            name: resultBoard.name,
            url: resultBoard.url
          });
        }
      })
    }
  })
}
