import mysql from "mysql2/promise"

const connectionConfig = {
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "new-recycling",
}

export const createDatabaseConnection = async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig)
    return connection
  } catch (error) {
    console.error("Database connection error:", error.message)
    throw error
  }
}

export const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NGNiOTcyLTczNGQtNDQ2MS05ZDE1LTM0ZGRhYzhjNGE2ZCIsImlhdCI6MTcwNTMzMzQzNiwiZXhwIjoxNzA1MzQ0MjM2fQ.7NsAzhPHN4tQ91BkeYXMpDTAxU0O8EVjA2VLfMbGIdw"
