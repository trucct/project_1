const express = require('express');
const route = express.Router()

const services = require('../services/render')

/**
 * @description Root Route
 * @method Get/
 */

route.get('/', services.homeRoutes);

/**
 * @description Add subject
 * @method Get/add-subject
 */
route.get('/add-subject', services.add_subject)

/**
 * @description for update subject
 * @method Get/update-subject
 */
route.get('/update-subject', services.update_subject)

module.exports = route
