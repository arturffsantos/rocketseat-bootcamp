const express = require('express');

const server = express();
server.use(express.json());
const port = 3000;

const projects = [];
let requestCounter = 0;

/* Middlewares */

function findProjectIndex(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Project id is required!' });
  }

  const index = projects.findIndex(value => {
    return value.id === id;
  });

  if (index === -1) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  req.projectIndex = index;
  next();
}

function checkProjectExists(req, res, next) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Project id is required!' });
  }

  const index = projects.findIndex(value => {
    return value.id === id;
  });

  if (index !== -1) {
    return res
      .status(400)
      .json({ error: `Project with id=${id} already exists!` });
  }

  next();
}

function countRequests(req, res, next) {
  requestCounter++;
  console.log(`Number of requests: ${requestCounter}`);

  next();
}

/* Routes */
server.post('/projects', countRequests, checkProjectExists, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.get('/projects', countRequests, (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', countRequests, findProjectIndex, (req, res) => {
  const { title } = req.body;

  projects[req.projectIndex].title = title;

  return res.json(projects);
});

server.delete('/projects/:id', countRequests, findProjectIndex, (req, res) => {
  projects.splice(req.projectIndex, 1);

  return res.send();
});

server.post(
  '/projects/:id/tasks',
  countRequests,
  findProjectIndex,
  (req, res) => {
    const { title } = req.body;

    projects[req.projectIndex].tasks.push(title);

    return res.json(projects);
  }
);

server.listen(port, () => console.log(`Listening on port ${port}`));
