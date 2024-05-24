import mongoose from 'mongoose'

describe('Actions endpoints integration tests', () => {
  beforeAll(async () => {
    const { MONGO_TEST_URL } = process.env

    await mongoose.connect(MONGO_TEST_URL);
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  test('It works successfully', async () => {
    expect(100).toBe(100)
  })
})