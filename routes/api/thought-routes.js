const router = require('express').Router();
const {  
  addThought,  
  removeThought,  
  addReaction,  
  removeReaction 
} = require('../../controllers/thought-controller');

// /api/Thoughts/<userId>
router
.route('/:userId')
.post(addThought);

// /api/Thoughts/<userId>/<ThoughtId>
router
.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought);

router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;