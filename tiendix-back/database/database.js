import mysql from "mysql2/promise"
import {productionDBConfig} from "./dbConfig.js"

export const pool = mysql.createPool(productionDBConfig)

export async function disconnectDatabase(){
    await pool.end()
}