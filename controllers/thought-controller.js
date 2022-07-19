const { Thought, User } = require('../models');

const thoughtController = {

  getAllThought(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
     });
},

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtid })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
 },

  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Could not find user with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  // remove Thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thoughts were found with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { Thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User with this id not found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
      )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Could not find user with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove Reaction
removeReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.ThoughtId },
    { $pull: { replies: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

};

module.exports = thoughtController;