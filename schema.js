const { GraphQLInt, GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql");
const axios=require('axios');
//Launch Type
const LaunchType=new GraphQLObjectType({
    name:"Launch",
    fields:()=>({
        flight_number:{type:GraphQLInt},
        mission_name:{type:GraphQLString},
        launch_year:{type:GraphQLString},
        launch_data_local:{type:GraphQLString},
        launch_success:{type:GraphQLBoolean},
        rocket:{type:RocketType}
    })
})

//Rocket Type
const RocketType=new GraphQLObjectType({
    name:"Rocket",
    fields:()=>({
        rocket_id:{type:GraphQLString},
        rocket_name:{type:GraphQLString},
        rocket_type:{type:GraphQLString},
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        try {
          return (await axios.get("https://api.spacexdata.com/v3/launches")).data;
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

module.exports=new GraphQLSchema({
    query:RootQuery
});