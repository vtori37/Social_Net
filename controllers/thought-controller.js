const { Thought, User } = require('../models');

const thoughtController = {

  getAllThoughts(req, res) {
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
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then( dbThoughtData => {
        if (!dbThoughtData){ 
          res.status(404).json({ message: 'Cannot find thought with this id!' });
            return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
 },

  addThought({ body }, res) {
    Thought.create(body)
      .then(({ dbThoughtData }) => {
        return User.findOneAndUpdate(
          { _id: dbThoughtData.username },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Could not find user with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },


  // remove Thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thoughts were found with this id!' });
        }
      res.json(dbThoughtData);
    })
      .catch(err => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body} },
      { new: true, runValidators: true }
      )
      .then(dbThoughtData  => {
        if (!dbThoughttData ) {
          res.status(404).json({ message: 'Could not find thought with this id!' });
          return;
        }
        res.json(dbThoughtData );
      })
      .catch(err => res.json(err));
     
    },

  // remove Reaction
removeReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId }}},
    { new: true, runValidators: true }
  )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No reactions with this id were found!' });
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},

};

module.exports = thoughtController;