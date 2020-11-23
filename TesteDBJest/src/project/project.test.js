const project = require('./project')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise dos projetos', () => {
    
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

    it ('Deve retornar 33,3% como %completude no projeto (id=2) com 3 tarefas, sendo 1 completada', () => {
        const projectId = 2
        return (project.completedTasks(projectRepo,taskRepo,projectId))
                .then((data) => expect(data).toBe(33.3));
    })

    it ('Deve retornar 720 no tempo restante do projeto (id=2)', () => {
        const projectId = 2
        return (project.remainingTime(projectRepo,taskRepo,projectId))
                .then((data) => expect(data).toBe(720));
    })

   
})