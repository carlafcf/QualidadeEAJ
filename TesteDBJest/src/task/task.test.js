const task = require('./task')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise das tarefas', () => {

    beforeAll(() => {
        return new Promise((resolve, reject) => {
            dao = new AppDAO('../../database.db');
            resolve()
        }).then(() => {
            projectRepo = new ProjectRepository(dao);
            taskRepo = new TaskRepository(dao);
            resolve()
        }).then(() => {
            resolve()
        })
    })

    it ('Deve recusar criação de tarefa no projeto de id 1 (6 tarefas incompletas)', () => {
        const name = "Tarefa recusada"
        const description = "Essa tarefa tentará ser adicionada em um projeto que já possui 5 tarefas incompletas, e não será adicionada"
        const duration = 120
        const isComplete = 0
        const projectId = 1
        return (task.createTask(projectRepo, taskRepo, name, description, duration, isComplete, projectId))
            .then((data) => expect(data).toBe('Refused'));
    })

    it ('Deve aceitar criação de tarefa no projeto de id 2 (2 tarefas incompletas)', () => {
        const name = "Tarefa confirmada"
        const description = "Essa tarefa tentará ser adicionada em um projeto que possui 2 tarefas incompletas, e será adicionada"
        const duration = 120
        const isComplete = 0
        const projectId = 2
        return (task.createTask(projectRepo, taskRepo, name, description, duration, isComplete, projectId))
            .then((data) => expect(data).toBe('Confirmed'));
    })

})