const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Teacher API",
      version: "1.0.0",
      description: "API documentation for managing teachers",
      contact: {
        name: "maghfera hassan",
        email: "maghferahassan47@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "development server",
      },
    ],
    components: {
      schemas: {
        Teacher: {
          type: "object",
          properties: {
            _id: {
            type: 'string',
            format: 'objectId',
           description: "ID of the teacher. Must be a valid ObjectId."
            },
            fullname: {
              type: "string",
              description: "The full name of the teacher.",
            },
            password: {
              type: "string",
              description: "The password of the teacher.",
            },
            email: {
              type: "string",
              description: "The Email of the teacher.",
            },
            image: {

              type: "string",
              format: "binary",
              description:
                "The URL of the image associated with the teacher.",
            },
            isSupervisor: {
              type: "string",
              enum: ["supervisor", "teacher"],
              default: "teacher",
              description:
                "Indicates whether the teacher is a supervisor or not.",
            },
          },
        },
        child:{
          type: 'object',
          properties: {
            _id: {
              type: 'number',
              description: 'The auto-incremented ID of the child.',
            },
            fullName: {
              type: 'string',
              description: 'The full name of the child.',
            },
            age: {
              type: 'number',
              minimum: 2,
              maximum: 11,
              description: 'The age of the child. Must be between 2 and 11.',
            },
            level: {
              type: 'string',
              enum: ['PREKG', 'KG1', 'KG2'],
              description: 'The level of the child.',
            },
            address: {
              type: 'object',
              properties: {
                city: {
                  type: 'string',
                  description: 'The city of the child\'s address.',
                },
                street: {
                  type: 'string',
                  description: 'The street of the child\'s address.',
                },
                building: {
                  type: 'number',
                  description: 'The building number of the child\'s address.',
                },
              },
            },
          },
        },
        class: {
          type: 'object',
          properties: {
            _id: {
              type: 'number',
              description: 'The auto-incremented ID of the class.',
            },
            name: {
              type: 'string',
              description: 'The name of the class.',
              uniqueItems: true,
            },
            supervisor: {
              type: 'string',
              description: 'The ID of the supervisor teacher for the class.',
            },
            children: {
              type: 'array',
              items: {
                type: 'number',
                description: 'The IDs of the children in the class.',
              },
            },
          },
        },
      },
      responses:{
        400:{
          description:"Missing api key",
          contents:'application/json'
        },
        401:{
          description:"unauthorized",
          contents:'application/json'
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      }
    },
  },
  apis: ["./routes/*.js"],
  security: [
    {
      bearerAuth: [],
    },
  ]
};

module.exports = swaggerOptions;



