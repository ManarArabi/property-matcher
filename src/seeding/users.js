import { config } from 'dotenv'
import { UserRoles, UserStatus } from '../modules/users/model/constants.js'
import { Users } from '../modules/users/model/schema.js'
import { hashData } from '../common/utils/hashing.js'
import Promise from 'bluebird'
import { generateRandomEgyptianPhoneNumber } from '../common/fakers/phone-number.js'

config()

/**
 * It seeds basic admin user if there is none
 *
 * @returns {Promise<void>}
 */
export const seedAdminUser = async () => {
  const adminUsersCount = await Users.countDocuments({ role: UserRoles.ADMIN })

  if (adminUsersCount !== 0) { return }

  const adminPayload = {
    name: 'admin user',
    password: await hashData(process.env.BASIC_ADMIN_PASSWORD),
    role: UserRoles.ADMIN,
    phone: process.env.BASIC_ADMIN_PHONE,
    status: UserStatus.ACTIVE
  }

  await Users.create(adminPayload)

  console.log('Basic admin is seeded successfully')
}

/**
 * It seeds number of clients equal to the provided number with fixed password
 *
 * @param {number} numberOfClients
 *
 * @returns {Promise<void>}
 */
export const seedBulkOfClients = async (numberOfClients) => {
  const clients = await Promise.map(Array.from({ length: numberOfClients }, (_, i) => i + 1), async index => ({
    role: UserRoles.CLIENT,
    phone: generateRandomEgyptianPhoneNumber(),
    password: await hashData(process.env.SEEDED_CLIENTS_PASSWORD),
    name: `client ${index}`,
    status: UserStatus.ACTIVE
  }))

  await Users.insertMany(clients)

  console.log('Clients are seeded successfully')
}

/**
 * It seeds number of agents equal to the provided number with fixed password
 *
 * @param {number} numberOfAgents
 *
 * @returns {Promise<void>}
 */
export const seedBulkOfAgents = async (numberOfAgents) => {
  const agents = await Promise.map(Array.from({ length: numberOfAgents }, (_, i) => i + 1), async index => ({
    role: UserRoles.AGENT,
    phone: generateRandomEgyptianPhoneNumber(),
    password: await hashData(process.env.SEEDED_AGENTS_PASSWORD),
    name: `agent ${index}`,
    status: UserStatus.ACTIVE
  }))

  await Users.insertMany(agents)

  console.log('Agents are seeded successfully')
}
