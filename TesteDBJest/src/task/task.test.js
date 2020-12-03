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

    it ('Deve retornar REFUSED na tentativa de adicionar tarefas no projeto id=1', () => {
        const name="Tarefa recusada"
        const description="Tarefa recusada"
        const duration = 120
        const isComplete=0
        const projectId=1
        return (task.createTask(projectRepo,taskRepo,name,description,duration,isComplete,projectId))
                .then((data) => expect(data).toBe('Refused'));
    })

    it ('Deve retornar ACCEPTED na tentativa de adicionar tarefas no projeto id=2', () => {
        const name="Tarefa aceitada"
        const description="Tarefa aceitada"
        const duration = 120
        const isComplete=0
        const projectId=2
        return (task.createTask(projectRepo,taskRepo,name,description,duration,isComplete,projectId))
                .then((data) => expect(data).toBe('Accepted'));
    })

})