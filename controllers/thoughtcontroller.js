const Thought = require('../models/thought');

exports.getAllThoughts = async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching thoughts", error });
    }
  };

  exports.createThought = async (req, res) => {
    try {
      const { thoughtText, username } = req.body;
      const newThought = new Thought({ thoughtText, username });
  
      await newThought.save();
      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json({ message: "Error creating thought", error });
    }
  };

  exports.getThoughtById = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateThought = async (req, res) => {
  try {
      const { thoughtId } = req.params;
      const updateData = req.body;

      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, updateData, { new: true, runValidators: true });
      if (!updatedThought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.status(200).json(updatedThought);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.deleteThought = async (req, res) => {
  try {
      const { thoughtId } = req.params;
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);

      if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.status(200).json({ message: 'Thought successfully deleted' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// {{REACTIONS}}

exports.addReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const newReaction = req.body;
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: newReaction } },
            { new: true, runValidators: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reaction', error });
    }
};

exports.removeReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error });
    }
};