/**
 * Created by Zakaria on 31/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  endDate: Date,
  state: {
    type: String,
    enum: ['completed', 'pending', 'InProgress', 'closed']
  },
  finished: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false// true means it has been deleted
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Task', taskSchema);