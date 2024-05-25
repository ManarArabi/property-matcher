import _ from 'lodash'

/**
 * It casts string to boolean
 *
 * @param {String} val
 *
 * @returns {Boolean}
 */
export const castToBoolean = val => {
  if (_.isString(val) && val.toLowerCase() === 'false') { return false }
  return Boolean(val)
}
