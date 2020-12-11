const express = require('express');
const TechniciansService = require('./technicians-service');

const techniciansRouter = express.Router();
const jsonParser = express.json();

techniciansRouter.route('/').get((req, res, next) => {
  TechniciansService.getAllTechnicians(req.app.get('db'))
    .then((jobs) => {
      res.json(jobs);
    })
    .catch(next);
});

techniciansRouter
  .route('/:id')
  .put(jsonParser, (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const { body } = req;
    db('technicians')
      .where({ _id: id })
      .update(body)
      .returning('*')
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  })
  .get(async (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');
    try {
      const result = await db.from('technicians').where('_id', id).first();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    db('technicians')
      .where({ _id: id })
      .delete()
      .returning('*')
      .then((tech) => {
        const techId = tech[0]._id;
        res
          .status(201)
          .send({ message: `Deleted technician with id: ${techId}` });
      })
      .catch(next);
  });

module.exports = techniciansRouter;
