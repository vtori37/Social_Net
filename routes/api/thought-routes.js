const router = require('express').Router();
const {  
  getAllThought,
  getThoughtById,
  addThought,  
  removeThought, 
  addReaction,  
  removeReaction, 
} = require('../../controllers/thought-controller');

// /api/Thoughts/<userId>
router
.route('/')
.get(getAllThought)
.post(addThought);

router
.route('/:id')
.get(getThoughtById)
.post(addThought)
.delete(removeThought);

// /api/Thoughts/<userId>/<ThoughtId>
router
.route('/:userId/:thoughtId/reactions')
.put(addReaction)
.delete(removeReaction);

module.exports = router;