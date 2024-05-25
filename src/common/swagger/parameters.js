export const PaginationSkipParam = {
  in: 'query',
  name: 'skip',
  schema: {
    type: 'number'
  },

  description: 'pagination skip'
}

export const PaginationLimitParam = {
  in: 'query',
  name: 'limit',
  schema: {
    type: 'number'
  },

  description: 'pagination limit'
}
