import bcrypt from 'bcrypt'

/**
 * Taking a plain data, generates a salt and hashes it
 * using bcrypt
 *
 * @param {Any} data - plain data
 * @param {Number} [SALT_WORK_FACTOR=10] - salt, defaults as 10
 *
 * @returns {Promise<String>} hash
 */
export const hashData = async (data, SALT_WORK_FACTOR = 10) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)

  return bcrypt.hash(data, salt)
}
