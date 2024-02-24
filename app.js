require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');
const app = express();
const port = 4033;
const authV = require('./helpers/authValidator');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const sequelize = require('./config/database')
const cors = require('cors')

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:8081'
}))

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// User auth
// app.use(authV);

// Routes
app.use(routes);