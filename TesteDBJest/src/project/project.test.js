const project = require('./project')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise das projetos', () => {
    
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

    it ('Em um projeto com 3 tarefas e 1 delas completa (id=2), o % completas é 33,3%', () => {
        const projectId=2
        return (project.completedTaks(projectRepo, taskRepo, projectId))
            .then((data) => expect(data).toBe(33.3));
    })

    it ('O tempo restante de um projeto (id=2) é 720', () => {
        const projectId=2
        return (project.remainingTime(projectRepo, taskRepo, projectId))
            .then((data) => expect(data).toBe(720));
    })
})