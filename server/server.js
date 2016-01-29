Meteor.startup(function(){

  Meteor.methods({
    upsertBoard: function(boardObject){

      Boards.upsert({
        idBoard: boardObject.idBoard
      }, {
        $set: {
          owner_id: Meteor.userId(),
          idBoard: boardObject.idBoard,
          name: boardObject.name,
          url: boardObject.url
        }
      })
    },
    upsertList: function(listObject){

      Lists.upsert({
        idList: listObject.idList
      }, {
        $set: {
          owner_id: Meteor.userId(),
          idList: listObject.idList,
          idBoard: listObject.idBoard,
          name: listObject.name,
        }
      })
    },
    upsertCard: function(cardObject){

      Lists.upsert({
        idCard: cardObject.idCard
      }, {
        $set: {
          owner_id: Meteor.userId(),
          idCard: cardObject.idCard,
          idList: cardObject.idList,
          idBoard: cardObject.idBoard,
          name: cardObject.name,
          desc: cardObject.desc,
        }
      })
    }
  })

})
