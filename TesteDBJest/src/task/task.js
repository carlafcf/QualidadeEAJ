const ProjectRepository = require("../project/project_repository")
const project = require('./../project/project')

module.exports = {
    createTask: (projectRepo,taskRepo,name,description,duration,isComplete,projectId) => {
        return projectRepo.getIncompletedTasks(projectId)
            .then((data) => {
                if (data.length > 5) {
                    return "Refused"
                }
                else {
                    return "Accepted"
                }
            })
    }
}