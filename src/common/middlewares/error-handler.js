import httpStatus from 'http-status'
import _ from 'lodash'

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = httpStatus

export const errorHandler = (error, req, res, next) => {
  const response = {
    status: INTERNAL_SERVER_ERROR,
    meta: { error },
    message: 'Something Went Wrong'
  }

  if (!_.isNil(error.status)) {
    response.status = error.status
  }

  if (!_.isNil(error.message)) {
    response.message = error.message
  }

  if (!_.isNil(error.meta)) {
    response.meta = error.meta
  }

  if (error.isJoi) {
    response.status = BAD_REQUEST
    response.message = 'Request body is not valid'
  }

  return res.status(response.status).json(response)
}
