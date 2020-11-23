module.exports = {
    createTask: (projectRepo, taskRepo, name, description, duration, isComplete, projectId) => {

        return projectRepo.getIncompletedTasks(projectId)
            .then((data) => {
                if (data.length > 5) {
                    return "Refused"
                }
                else {
                    // taskRepo.create(name, description, duration, isComplete, projectId)
                    return "Confirmed"
                }
            })
    }
}