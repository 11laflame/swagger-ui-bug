module.exports = {
    summary: 'Upload file',
    description: 'Upload file discription',
    tags: [ 'upload-file' ],
    consumes: [ 'multipart/form-data' ],
    produces: [ 'application/json', 'application/octet-stream' ],
    querystring: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', description: 'Optional id' },
      },
      required: [],
    },
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description: 'File to be uploaded',
              },
            },
            required: [ 'file' ],
          },
        },
      },
    },
    response: {
      200: {
        description: 'File uploaded successfully',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        description: 'Invalid request',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      401: {
        description: 'Unauthorized',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      404: {
        description: 'File not found',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal server error',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  
  };