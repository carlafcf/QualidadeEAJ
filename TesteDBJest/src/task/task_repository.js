// task_repository.js

class TaskRepository {
    constructor(dao) {
      this.dao = dao
    }

    createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          duration INTEGER,
          isComplete INTEGER DEFAULT 0,
          projectId INTEGER,
          CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
            REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`
      return this.dao.run(sql)
    }
  
    dropTable() {
      const sql = `
        DROP TABLE tasks`
      return this.dao.run(sql)
    }

    create(name, description, duration, isComplete, projectId) {
        return this.dao.run(
          `INSERT INTO tasks (name, description, duration, isComplete, projectId)
            VALUES (?, ?, ?, ?, ?)`,
          [name, description, duration, isComplete, projectId])
    }

    update(task) {
        const { id, name, description, duration, isComplete, projectId } = task
        return this.dao.run(
          `UPDATE tasks
          SET name = ?,
            description = ?,
            duration = ?,
            isComplete = ?,
            projectId = ?
          WHERE id = ?`,
          [name, description, duration, isComplete, projectId, id]
        )
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM tasks WHERE id = ?`,
          [id]
        )
    }

    deleteAll() {
        return this.dao.run(
          `DELETE FROM tasks`
        )
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM tasks WHERE id = ?`,
          [id])
    }

    getTasks(projectId) {
        return this.dao.all(
          `SELECT * FROM tasks WHERE projectId = ?`,
          [projectId])
      }
  }
  
  module.exports = TaskRepository;