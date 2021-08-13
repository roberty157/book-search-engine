const {AuthenticationError} = require('apollo-server-express');
const { User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query:{
        
        users: async()=>{
            return User.find({});
        },
        me: async(parent,args,context)=>{
            //console.log(args);
            if(context.user){
                return User.findOne({_id:context.user._id})
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation:{
        addUser: async(parent, {username, email,password})=>{
            //console.log('making user', username);
            
            const user = await User.create({username, email,password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, { email, password }) => {
            //console.log('logging in', email);

            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },

        saveBook: async (parent,args,context)=>{
            console.log('args',args);

            const book = args.input;
            if(context.user){
                //const book = await Book.create({authors,description,bookId,image,link,title});
                const user = await User.findOne({_id:context.user._id });
                await User.findOneAndUpdate(
                    {_id:context.user._id},
                    {$addToSet:{savedBooks:{...book}}}
                );
                
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
            
        },
        removeBook: async (parent,{bookId},context)=>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('you need to be logged in!');
            
        }
    }
   


};
//get single user by either id or their username
//create user
//login a user, sign a token, and send it back
//save a book to a user's 'savedBooks' field by adding it to the set
//remove a book from 'savedBooks' take in id 
module.exports = resolvers;


