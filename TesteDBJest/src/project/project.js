const { resolve } = require("bluebird");

module.exports = {
    completedTasks: (projectRepo, taskRepo, projectId) => {
        let completed
        let incompleted
        return projectRepo.getCompletedTasks(projectId)
            .then((data) => {
                completed=data.length
            })
            .then(()=> {
                return projectRepo.getIncompletedTasks(projectId)
            })
            .then((data) => {
                incompleted=data.length
                return parseFloat((completed*100/(completed+incompleted)).toFixed(1))
            })
    },
    remainingTime: (projectRepo,taskRepo,projectId) => {
        return projectRepo.getRemainingTime(projectId)
            .then((data) => {
                let total=0
                data.forEach(row => {
                    total += row.duration>240 ? row.duration*2 : row.duration
                });
                return total
            })
    }
}