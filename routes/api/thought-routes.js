const router = require('express').Router();
const {  
  getAllThoughts,
  getThoughtById,
  addThought,  
  removeThought, 
  addReaction,  
  removeReaction, 
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router
.route('/')
.get(getAllThoughts)
.post(addThought);

router
.route('/:id')
.get(getThoughtById)
.post(addThought)
.delete(removeThought)

// /api/thoughts/<userId>/<ThoughtId>
router
.route('/:thoughtId/reactions/')
.post(addReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;