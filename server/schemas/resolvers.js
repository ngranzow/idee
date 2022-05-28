//CONST
const { User, Idee } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//RESOLVER
const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('idees')
                    .populate('friends')
                    .populate('communities');

                return userData;
            }

            throw new AuthenticationError('Please sign up or log in to proceed.');
        },

        //Many Idees
        idees: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Idee.find(params).sort({ createdAt: -1 });
        },

        //Find One Idee
        idee: async (parent, { _id }) => {
            return Idee.findOne({ _id });
        },

        //Find all Users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('communities')
                .populate('friends')
                .populate('idees');
        },
        //Find one User by Username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('communities')
                .populate('friends')
                .populate('idees');
        },
    },

    Mutation: {

        //Add User
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        //Login Check
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect username. Please try again.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password. Please try again.');
            }

            const token = signToken(user);
            return { token, user };
        },

        //ADD IDEE
        addIdee: async (parent, args, context) => {
            if (context.user) {
                const idee = await Idee.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { idees: idee._id } },
                    { new: true }
                );

                return idee;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD REPLY
        addReply: async (parent, { ideeID, replyBody }, context) => {
            if (context.user) {
                const updatedIdee = await Idee.findOneAndUpdate(
                    { _id: ideeID },
                    { $push: { replys: { replyBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedIdee;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD FRIEND
        addFriend: async (parent, { friendID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendID } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD COMMUNITY
        addCommunity: async (parent, { communityID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: communityID } },
                    { new: true }
                ).populate('communities');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;