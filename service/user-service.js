import UserModel from '../models/users-model.js';
import { once } from 'node:events';
import JWT from 'jsonwebtoken';

const DEFAULT_USER = {
    user: 'tst',
    password: '123'
};
const JWT_KEY = 'abc123';

// Create new user
export const createUser = async (req, res) => {
    try {
        let t = JWT.sign({ user: DEFAULT_USER.user, message: 'Signed in' }, JWT_KEY);
        let result = await UserModel.create({
            name: 'Default',
            token: t ?? null
        });
        res.json({success: true, data: result}).status(200);
    } catch(err) {
        console.log('Error to create the user: ' + err);
        res.json({success: false, message: 'Error to create the user.'}).status(501);
    }
};

async function loginRoute(request, response) {
    const { user, password } = JSON.parse(await once(request, 'data'));
    if (user !== DEFAULT_USER.user || password !== DEFAULT_USER.password) {
        response.status(401);
        response.end(JSON.stringify({ error: 'invalid username!' }));
        return;
    }
    const token = JWT.sign({ user, message: 'Signed in' }, JWT_KEY);
    return token;
    // response.end(JSON.stringify({ token }))
}

export function isHeadersValid(headers) {
    try {
        const auth = headers.authorization.replace(/bearer\s/ig, '');
        JWT.verify(auth, JWT_KEY);
        return true
    } catch (error) {
        return false
    }
}