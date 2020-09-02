const express = require('express');
const Contact = require('./models/Contact');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
// add private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// update
// private :id
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactField = {};
  if (email) contactField.email = email;
  if (name) contactField.name = name;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(401).json({ msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactField },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// delete private :id
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(401).json({ msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      res.status(400).json({ msg: 'User not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json('Contact Removed');
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// get all contacts private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
