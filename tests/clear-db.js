import mongoose from 'mongoose'

const clearDb = async () => {
  const { MONGO_TEST_URL } = process.env

  await mongoose.connect(MONGO_TEST_URL)
  await mongoose.connection.dropDatabase()

  // Close mongoose connection
  await mongoose.connection.close()
}

export default clearDb
