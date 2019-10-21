import {
    returnUserId
} from "../helpers/generateToken";
import {
    users
} from "../controllers/userController"

const veriftyToken = (req, res, next) => {
    const authorizationHeader = req.header('authorization');
    if (!authorizationHeader) {
        return res.status(400).send({
            status: 400,
            error: "token is unavailable"
        })
    }

    try {
        const result = returnUserId(authorizationHeader);
        const authUser = users.find(user => user.id === result);
        if (!authUser) {
            return res.status(401).send({
                status: 401,
                error: "not authorized to do the task"
            })
        }
        next();
    } catch (error) {
        return res.status(400).send({
            status: 400,
            error: error.message
        })
    }

}

export default veriftyToken;