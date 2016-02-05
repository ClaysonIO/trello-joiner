Meteor.startup(function(){

  Meteor.methods({
    upsertBoard: function(boardObject){

      Boards.upsert({
        idBoard: boardObject.idBoard,
        owner_id: Meteor.userId()
      }, {
        $set: {
          idBoard: boardObject.idBoard,
          name: boardObject.name,
          url: boardObject.url
        }
      })
    },
    upsertList: function(listObject){

      Lists.upsert({
        idList: listObject.idList,
        owner_id: Meteor.userId()
      }, {
        $set: {
          idList: listObject.idList,
          idBoard: listObject.idBoard,
          name: listObject.name,
        }
      })
    },
    upsertCard: function(cardObject){

      Cards.upsert({
        idCard: cardObject.idCard,
        owner_id: Meteor.userId()
      }, {
        $set: {
          idCard: cardObject.idCard,
          idList: cardObject.idList,
          sourceIdBoard: cardObject.sourceIdBoard,
          name: cardObject.name,
          desc: cardObject.desc,
        }
      })
    }
  })

})
