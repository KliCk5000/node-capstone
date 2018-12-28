const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Reminders Schema
const ReminderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  createdTime: { type: String, default: '' },
  sendTime: { type: String, default: '' },
});

const Reminder = mongoose.model('Reminder', ReminderSchema);

// Note Schema
const NoteSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
});

const Note = mongoose.model('Note', NoteSchema);

// Client Schema
const ClientSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  notes: [NoteSchema],
  reminders: [ReminderSchema],
});

ClientSchema.methods.serialize = () => ({
  firstName: this.firstName,
  lastName: this.lastName,
  phoneNumber: this.phoneNumber,
});

const Client = mongoose.model('Client', ClientSchema);

// User Schema
const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  clientList: [ClientSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User, Client, Note, Reminder,
};
