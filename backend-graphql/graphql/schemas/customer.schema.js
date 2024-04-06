var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLFloat = require("graphql").GraphQLFloat;
var GraphQLBoolean = require("graphql").GraphQLBoolean;
var jwt = require("jsonwebtoken");

// Import models
var user = require("../models/user");
var review = require("../models/review");
var support = require("../models/customerSupport");
var booking = require("../models/booking");

// Import resolvers
var userResolver = require("../resolvers/user-resolver");
var reviewResolver = require("../resolvers/review-resolver");
var supportResolver = require("../resolvers/support-resolver");
var bookingResolver = require("../resolvers/booking-resolver");

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

// Booking Type
var BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLID },
    flightNumber: { type: GraphQLNonNull(GraphQLString) },
    passengerName: { type: GraphQLNonNull(GraphQLString) },
    seatNumber: { type: GraphQLNonNull(GraphQLString) },
    departureAirport: { type: GraphQLNonNull(GraphQLString) },
    arrivalAirport: { type: GraphQLNonNull(GraphQLString) },
    departureDate: { type: GraphQLNonNull(GraphQLString) },
    arrivalDate: { type: GraphQLNonNull(GraphQLString) },
    ticketPrice: { type: GraphQLNonNull(GraphQLFloat) },
    status: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// Login Response Type
var loginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: function () {
    return {
      token: { type: GraphQLString },
      firstName: { type: GraphQLString }, //Anson's changes
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
      isLoggedIn: {
        type: GraphQLBoolean, // Change the type to Boolean
        resolve: function (_, __, context) {
          const authHeader = context.req.headers.authorization;

          // If the Authorization header is not set, return false
          if (!authHeader) {
            return false;
          }

          // Extract the token from the Authorization header
          const token = authHeader.split(" ")[1]; // Assumes "Bearer <token>"

          // Verify the token
          try {
            jwt.verify(token, process.env.JWT_SECRET); // Make sure to use the correct secret
            return true; // Token is valid, user is logged in
          } catch (e) {
            // If verification fails, return false
            return false;
          }
        },
      },
      bookings:{
        type: new GraphQLList(BookingType),
        resolve: bookingResolver.getBookings
      },
      booking: {
        type: BookingType,
        args: {
          id:{
            name: "id",
            type: GraphQLID,
          }
        },
        resolve:bookingResolver.getBookingById
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
      login: {
        type: loginResponseType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve: userResolver.login,
      },
      logout: {
        type: GraphQLString,
        resolve: userResolver.logout,
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
      addBooking: {
        type: BookingType,
        args: {
          flightNumber: {
            type: new GraphQLNonNull(GraphQLString),
          },
          passengerName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          seatNumber: {
            type: new GraphQLNonNull(GraphQLString),
          },
          departureAirport: {
            type: new GraphQLNonNull(GraphQLString),
          },
          arrivalAirport: {
            type: new GraphQLNonNull(GraphQLString),
          },
          departureDate: {
            type: new GraphQLNonNull(GraphQLString),
          },
          arrivalDate: {
            type: new GraphQLNonNull(GraphQLString),
          },
          ticketPrice: {
            type: new GraphQLNonNull(GraphQLFloat),
          },
          status: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: bookingResolver.addBooking,
      },
    };
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});
