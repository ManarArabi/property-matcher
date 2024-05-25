import mongoose from 'mongoose'
import app from './app.js'
import { seedAdminUser, seedBulkOfAgents, seedBulkOfClients } from './seeding/users.js'
import { config } from 'dotenv'
import { castToBoolean } from './common/utils/boolean.js'

config()

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log('Mongoose is running')

  await seedAdminUser()

  if (castToBoolean(process.env.SEED_CLIENTS_FLAG)) {
    await seedBulkOfClients(Number(process.env.NUM_OF_SEEDED_CLIENTS) || 1)
  }

  if (castToBoolean(process.env.SEED_AGENTS_FLAG)) {
    await seedBulkOfAgents(Number(process.env.NUM_OF_SEEDED_AGENTS) || 1)
  }
}).catch((err) => {
  console.log(`Failed to start the app with error: ${err}`)
})
