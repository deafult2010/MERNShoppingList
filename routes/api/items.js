const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @description Get All Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @description Create an Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route PUT api/items
// @description Create an Item
// @access Public
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).then((item) => res.json(item));
});

// @route DELETE api/items/:id
// @description Delete an Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item.remove().then(() => res.json({ id: req.params.id, success: true }))
    )
    .catch((err) =>
      // res.status(404).json({ id: req.params.id, success: false })
      // Allow user to delete already deleted id.
      res.json({ id: req.params.id, success: false })
    );
});

module.exports = router;
