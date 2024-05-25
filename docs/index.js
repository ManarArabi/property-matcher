import { AdsEndpointsDocs } from '../src/modules/ads/docs/index.js'
import { PropertyRequestEndpointsDocs } from '../src/modules/property-request/docs/index.js'
import { UsersEndpoints } from '../src/modules/users/docs/index.js'

export const moduleEndpointsDocumentation = {
  ...UsersEndpoints,
  ...AdsEndpointsDocs,
  ...PropertyRequestEndpointsDocs
}
