import { config } from 'dotenv'
import clearDb from './clear-db.js'

config()

const globalTeardown = async () => {
  await clearDb()
}

export default globalTeardown
