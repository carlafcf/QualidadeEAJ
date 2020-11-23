// project_repository.js

class ProjectRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`
      return this.dao.run(sql)
    }

    dropTable() {
      const sql = `
        DROP TABLE projects`
      return this.dao.run(sql)
    }

    create(name) {
        return this.dao.run(
          'INSERT INTO projects (name) VALUES (?)',
          [name])
    }

    update(project) {
        const { id, name } = project
        return this.dao.run(
          `UPDATE projects SET name = ? WHERE id = ?`,
          [name, id]
        )
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM projects WHERE id = ?`,
          [id]
        )
    }

    deleteAll() {
        return this.dao.run(
          `DELETE FROM projects`
        )
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM projects WHERE id = ?`,
          [id])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM projects`)
    }

    getTasks(projectId) {
        return this.dao.all(
          `SELECT * FROM tasks WHERE projectId = ?`,
          [projectId])
    }

    getCompletedTasks(projectId) {
      return this.dao.all(
        `SELECT * FROM tasks WHERE projectId = ? and isComplete=1`,
          [projectId]
      )
    }

    getIncompletedTasks(projectId) {
      return this.dao.all(
        `SELECT * FROM tasks WHERE projectId = ? and isComplete=0`,
          [projectId]
      )
    }

    getRemainingTime(projectId) {
      return this.dao.all(
        `SELECT duration FROM tasks WHERE projectId = ? and isComplete=0`,
          [projectId]
      )
    }

  }
  
  module.exports = ProjectRepository;