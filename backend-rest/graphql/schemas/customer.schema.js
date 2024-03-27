var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLFloat = require("graphql").GraphQLFloat;

// Import models
var user = require("../models/user");
var review = require("../models/review");
var support = require("../models/customerSupport");

// Import resolvers
var userResolver = require("../resolvers/user-resolver");
var reviewResolver = require("../resolvers/review-resolver");
var supportResolver = require("../resolvers/support-resolver");

// User Type
var userType = new GraphQLObjectType({
  name: "User",
  fields: function () {
    return {
      id: {
        type: GraphQLID,
      },
      firstName: {
        type: GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: GraphQLNonNull(GraphQLString),
      },
      address: {
        type: GraphQLNonNull(GraphQLString),
      },
      phoneNumber: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      role: {
        type: GraphQLNonNull(GraphQLString),
      },
    };
  },
});

// Review Type
var reviewType = new GraphQLObjectType({
  name: "Review",
  fields: function () {
    return {
      id: {
        type: GraphQLID,
      },
      overallRating: {
        type: GraphQLNonNull(GraphQLInt),
      },
      userReview: {
        type: GraphQLNonNull(GraphQLString),
      },
      improvements: {
        type: GraphQLString,
      },
      recommendation: {
        type: GraphQLNonNull(GraphQLString),
      },
      suggestions: {
        type: GraphQLString,
      },
      createdAt: {
        type: GraphQLString,
      },
    };
  },
});

// Support Type
var supportType = new GraphQLObjectType({
  name: "Support",
  fields: function () {
    return {
      id: {
        type: GraphQLID,
      },
      title: {
        type: GraphQLNonNull(GraphQLString),
      },
      content: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
      created: {
        type: GraphQLString,
      },
    };
  },
});

// define Queries

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: userResolver.getUsers,
      },
      user: {
        type: userType,
        args: {
          id: {
            name: "id",
            type: GraphQLID,
          },
        },
        resolve: userResolver.getUserById,
      },
      reviews: {
        type: new GraphQLList(reviewType),
        resolve: reviewResolver.getReviews,
      },
      review: {
        type: reviewType,
        args: {
          id: {
            name: "id",
            type: GraphQLID,
          },
        },
        resolve: reviewResolver.getReviewById,
      },
    };
  },
});

// define Mutations
var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addUser: {
        type: userType,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          address: {
            type: new GraphQLNonNull(GraphQLString),
          },
          phoneNumber: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          password: {
            type: new GraphQLNonNull(GraphQLString),
          },
          role: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: userResolver.addUser,
      },
      addReview: {
        type: reviewType,
        args: {
          overallRating: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          userReview: {
            type: new GraphQLNonNull(GraphQLString),
          },
          improvements: {
            type: GraphQLString,
          },
          recommendation: {
            type: new GraphQLNonNull(GraphQLString),
          },
          suggestions: {
            type: GraphQLString,
          },
        },
        resolve: reviewResolver.addReview,
      },
      addSupport: {
        type: supportType,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString),
          },
          content: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: supportResolver.addInquiry,
      },
    };
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});
