// main.js

// Tutorial: https://stackabuse.com/a-sqlite-tutorial-with-node-js/

const Promise = require('bluebird')
const AppDAO = require('./src/db/dao')
const ProjectRepository = require('./src/project/project_repository')
const TaskRepository = require('./src/task/task_repository')

function main() {
  const dao = new AppDAO('./database.db')
  
  const taskRepo = new ProjectRepository(dao)

  dao.db.serialize(() => {
    // resetDB(dao)
    // createProject1(dao)
    // createProject2(dao)
    readDB(dao)
  });

}

function resetDB(dao) {
  const projectRepo = new ProjectRepository(dao)
  const taskRepo = new TaskRepository(dao)
  
  projectRepo.dropTable()
    .then(() => taskRepo.dropTable())
}

function createProject1(dao) {//Project with more than 5 tasks incompletes
    const projectRepo = new ProjectRepository(dao)
    const taskRepo = new TaskRepository(dao)
    let projectId
  
    projectRepo.createTable()
      .then(() => taskRepo.createTable())
      .then(() => projectRepo.create("Projeto 1"))
      .then((data) => {
        projectId = data.id
        const tasks = [
          {
            name: 'Task 1',
            description: 'Detalhamento da task 1',
            duration: 60,
            isComplete: 0,
            projectId
          },
          {
            name: 'Task 2',
            description: 'Detalhamento da task 2',
            duration: 120,
            isComplete: 0,
            projectId
          },
          {
            name: 'Task 3',
            description: 'Detalhamento da task 3',
            duration: 300,
            isComplete: 0,
            projectId
          },
          {
            name: 'Task 4',
            description: 'Detalhamento da task 4',
            duration: 10,
            isComplete: 0,
            projectId
          },
          {
            name: 'Task 5',
            description: 'Detalhamento da task 5',
            duration: 100,
            isComplete: 0,
            projectId
          },
          {
            name: 'Task 6',
            description: 'Detalhamento da task 6',
            duration: 50,
            isComplete: 0,
            projectId
          }
        ]
        return Promise.all(tasks.map((task) => {
          const { name, description, duration, isComplete, projectId } = task
          return taskRepo.create(name, description, duration, isComplete, projectId)
        }))
      })
      .then(() => projectRepo.getById(projectId))
      .then((project) => {
        console.log(`\nRetreived project from database`)
        console.log(`project id = ${project.id}`)
        console.log(`project name = ${project.name}`)
        return projectRepo.getTasks(project.id)
      })
      .then((tasks) => {
        console.log('\nRetrieved project tasks from database')
        return new Promise((resolve, reject) => {
          tasks.forEach((task) => {
            console.log(`task id = ${task.id}`)
            console.log(`task name = ${task.name}`)
            console.log(`task description = ${task.description}`)
            console.log(`task duration = ${task.duration}`)
            console.log(`task isComplete = ${task.isComplete}`)
            console.log(`task projectId = ${task.projectId}`)
          })
        })
        resolve('success')
      })
      .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
}

function createProject2(dao) { //Project with 33,3% completed tasks
  const projectRepo = new ProjectRepository(dao)
  const taskRepo = new TaskRepository(dao)
  let projectId
  
  projectRepo.createTable()
    .then(() => taskRepo.createTable())
    .then(() => projectRepo.create("Projeto 2"))
    .then((data) => {
      projectId = data.id
      const tasks = [
        {
          name: 'Task 7',
          description: 'Detalhamento da task 7',
          duration: 100,
          isComplete: 1,
          projectId
        },
        {
          name: 'Task 8',
          description: 'Detalhamento da task 8',
          duration: 120,
          isComplete: 0,
          projectId
        },
        {
          name: 'Task 9',
          description: 'Detalhamento da task 9',
          duration: 300,
          isComplete: 0,
          projectId
        }
      ]
      return Promise.all(tasks.map((task) => {
        const { name, description, duration, isComplete, projectId } = task
        return taskRepo.create(name, description, duration, isComplete, projectId)
      }))
    })
    .then(() => projectRepo.getById(projectId))
    .then((project) => {
      console.log(`\nRetreived project from database`)
      console.log(`project id = ${project.id}`)
      console.log(`project name = ${project.name}`)
      return projectRepo.getTasks(project.id)
    })
    .then((tasks) => {
      console.log('\nRetrieved project tasks from database')
      return new Promise((resolve, reject) => {
        tasks.forEach((task) => {
          console.log(`task id = ${task.id}`)
          console.log(`task name = ${task.name}`)
          console.log(`task description = ${task.description}`)
          console.log(`task duration = ${task.duration}`)
          console.log(`task isComplete = ${task.isComplete}`)
          console.log(`task projectId = ${task.projectId}`)
        })
      })
      resolve('success')
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

function readDB(dao) {
    new Promise((resolve, reject) => {
      dao.db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) {
          // console.log('Error running sql: ' + sql)
          // console.log(err)
          reject(err)
        } else {
          console.log(rows)
          resolve(rows)
        }
      })
    })
}

main()