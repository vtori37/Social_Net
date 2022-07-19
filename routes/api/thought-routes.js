const router = require('express').Router();
const {  
  getAllThoughts,
  getThoughtById,
  addThought,  
  removeThought, 
  addReaction,  
  removeReaction, 
} = require('../../controllers/thought-controller');

// /api/Thoughts/<userId>
router
.route('/')
.get(getAllThoughts)
.post(addThought);

router
.route('/:id')
.get(getThoughtById)
.post(addThought)
.delete(removeThought);

// /api/Thoughts/<userId>/<ThoughtId>
router
.route('/:thoughtId/reactions/:reactionId')
.post(addReaction)
.delete(removeReaction);

module.exports = router;