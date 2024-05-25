import { UserRoles } from '../users/model/constants.js'

export const AdsAuthorization = {
  createAd: [UserRoles.AGENT],
  getAdPropertyRequestsMatches: [UserRoles.AGENT, UserRoles.ADMIN]
}
