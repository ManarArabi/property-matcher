import { UserRoles } from '../users/model/constants.js'

export const PropertyRequestAuthorization = {
  createPropertyRequest: [UserRoles.CLIENT],
  updatePropertyRequest: [UserRoles.CLIENT]
}
