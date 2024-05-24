import randtoken from 'rand-token'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const globalConfig = async () => {
  process.env.MONGO_TEST_URL = `${process.env.MONGO_TEST_URL}-${randtoken.generate(16)}`

  await mongoose.connect(process.env.MONGO_TEST_URL)
}

export default globalConfig