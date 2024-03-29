//CONST
const { User, Idee, Community } = require('../models');
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
                .populate('idees')
                .populate('friends')
                .populate('communities');
        },
        //Find one User by Username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('idees')
                .populate('friends')
                .populate('communities');
        },
        //Find many Communities
        communities: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Community.find(params).sort({ createdAt: -1 });
        },
        //Find one Community
        community: async (parent, { communityName }) => {
            return Community.findOne({ communityName });
        }
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
        addReply: async (parent, { ideeId, replyBody }, context) => {
            if (context.user) {
                const updatedIdee = await Idee.findOneAndUpdate(
                    { _id: ideeId },
                    { $push: { replys: { replyBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedIdee;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD FRIEND
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD COMMUNITY
        addCommunity: async (parent, args, context) => {
            if (context.user) {
                const community = await Community.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { communities: community._id } },
                    { new: true }
                );

                return community;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD COMMUNITY IDEE
        addCommunityIdee: async (parent, { communityName, communityIdeeText }, context) => {
            console.log(communityName, communityIdeeText)
            if (context.user) {
                console.log(context.user)
                const updatedCommunityIdee = await Community.findOneAndUpdate(
                    { communityName: communityName },
                    { $push: { communityIdees: { communityIdeeText, username: context.user.username } } },
                    { new: true, runValidators: true }
                );
                    console.log(updatedCommunityIdee)
                return updatedCommunityIdee;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        //ADD COMMUNITY REPLY
        addCommunityReply: async (parent, { communityName, communityIdeeId, communityReplyBody }, context) => {
            if (context.user) {
                const updatedCommunityReply = await Community.findOneAndUpdate(
                    { communityName: communityName, communityIdeeId: communityIdeeId },
                    { $push: { communityReplys: { communityReplyBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedCommunityReply;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;