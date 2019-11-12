/**
 * Created by diam on 05/08/19.
 */

const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        console.log(jwt.verify(token, APP_SECRET));
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId
    }

    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
};
