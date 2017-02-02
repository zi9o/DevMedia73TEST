/**
 * Created by Zakaria on 31/01/2017.
 */
var colors = require('colors');
var _ = require('lodash'),
  async = require('async');
var mongoose = require('mongoose');
var config = require('../../config');

var Task = require('../models/task.model');

module.exports = function (app, express) {

  var apiTask = express.Router();
  /*------------------------------------------ Routes/Middleware ------------------------------------------------*/

  /*-------------------------------------- GET /api/tasks --------------------------------------*/
  apiTask.get('/', list);
  /*-------------------------------------- POST /api/tasks -------------------------------------*/
  apiTask.post('/', create);
  /*-------------------------------------- GET /api/tasks/:taskId -------------------------*/
  apiTask.get('/:taskId', read);
  /*-------------------------------------- PUT /api/tasks/:taskId -------------------------*/
  apiTask.put('/:taskId', update);
  /*-------------------------------------- DELETE /api/tasks/:taskId ----------------------*/
  apiTask.delete('/:taskId', Delete);

  /*-------------------------------------------------------------------------------------------------*/
  // Finish by binding the Task middleware
  apiTask.param('taskId', taskByID);
  /*-------------------------------------------------------------------------------------------------*/
  // Finish by binding the Task middleware
  apiTask.param('taskId', taskByID);


  /*------------------------------------------ Used functions ---------------------------------------------------*/

  /**
   * List of Tasks
   */
  function list(req, res) {
    Task.find()
      .where('deleted').ne(true)
      .sort('-created')
      .exec(function (err, tasks) {
        if (err) {
          return res.status(400).send({
            message: 'error occured !'
          });
        } else {
          res.jsonp(tasks);
        }
      });
  };
  /**
   * Create a Task
   */
  function create(req, res) {
    var task = new Task(req.body);
    task.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: "Error : Task hasn't been saved"
        });
      } else {
        res.jsonp(task);
      }
    });
  };

  /**
   * Get one task
   */
  function read(req, res) {
    // convert mongoose document to JSON
    var task = req.task ? req.task.toJSON() : {};

    res.jsonp(task);
  };

  /**
   * Update a Task
   */
  function update(req, res) {
    var task = req.task;
    task = _.extend(task, req.body);
    task.updated = Date.now();
    task.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: "Error : Task hasn't been updated !"
        });
      } else {
        res.jsonp(task);
      }
    });
  };

  /**
   * Delete a Task
   */
  function Delete(req, res) {
    var task = req.task;

    task.deleted = true;

    task.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: "Error : Task hasn't been deleted !"
        });
      } else {
        res.jsonp(task);
      }
    });
  };
  /**
   * Task middleware
   */
  function taskByID(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: 'Task is invalid'
      });
    }

    Task.findById(id)
      .where('deleted').ne(true)
      .exec(function (err, task) {
        if (err) {
          return next(err);
        } else if (!task) {
          return res.status(404).send({
            message: 'No Task with that identifier has been found'
          });
        }
        req.task = task;
        next();
      });
  };
  return apiTask;
};