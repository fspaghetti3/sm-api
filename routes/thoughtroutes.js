const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtcontroller');

router.get('/', thoughtController.getAllThoughts);
router.post('/', thoughtController.createThought);
router.get('/:thoughtId', thoughtController.getThoughtById);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);

router.post('/:thoughtId/reactions', thoughtController.addReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);



module.exports = router;