import { expect } from 'chai'
import sinon from 'sinon'
import { Users } from '../src/modules/users/model/schema.js'
import { generateRandomEgyptianPhoneNumber } from '../src/common/fakers/phone-number.js'
import { UserRoles, UserStatus } from '../src/modules/users/model/constants.js'
import { UserServices } from '../src/modules/users/service.js'

describe('UserServices Unit Tests', () => {
  describe('getUsersStats function', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should return user stats', async () => {
      const expectedUsers = [{
        _id: '1',
        name: 'User 1',
        phone: generateRandomEgyptianPhoneNumber(),
        role: UserRoles.AGENT,
        status: UserStatus.ACTIVE,
        adsCount: 2,
        requestsCount: 0,
        totalAdsAmount: 100000,
        totalRequestsAmount: 0
      }, {
        _id: '1',
        name: 'User 2',
        phone: generateRandomEgyptianPhoneNumber(),
        role: UserRoles.CLIENT,
        status: UserStatus.ACTIVE,
        adsCount: 0,
        requestsCount: 2,
        totalAdsAmount: 0,
        totalRequestsAmount: 100000
      }]

      const aggregateStub = sinon.stub(Users, 'aggregate').resolves(expectedUsers)
      const countDocumentsStub = sinon.stub(Users, 'countDocuments').resolves(2)
      const result = await UserServices.getUsersStats()

      expect(result).to.deep.equal({
        data: expectedUsers,
        total: 2,
        page: 0,
        limit: 20,
        hasNextPage: false,
        hasPreviousPage: false
      })

      sinon.assert.calledOnce(aggregateStub)
      sinon.assert.calledOnce(countDocumentsStub)
    })
  })
})
