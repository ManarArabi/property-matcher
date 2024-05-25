import httpStatus from 'http-status'

const { INTERNAL_SERVER_ERROR } = httpStatus

class HttpError extends Error {
  constructor ({ message, status = INTERNAL_SERVER_ERROR, meta = {} } = {}) {
    super(message)

    this.status = status
    this.meta = meta
  }
}

export default HttpError
