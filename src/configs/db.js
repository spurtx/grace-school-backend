import pkg from 'pg';
import dotenv from 'dotenv'
const { Pool } = pkg;

dotenv.config()

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)

const pool = new Pool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    }
)

pool.on('connect', () => {
    console.log('Connection Pool established')
})

export default pool