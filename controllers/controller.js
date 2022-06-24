
const { User, UserIdentity } = require('../models')
const formatDate = require('../Helper/helper')
class Controller {


    static home(req, res) {
        res.render('home');

    }

    static profile(req, res) {
        const id = +req.params.id
        let userId = req.session.iduser
        console.log(userId)
        const options = {
            include: [User],
            where: {
                UserId: userId
            }
        }
        UserIdentity.findOne(options)
            .then(data => {
                res.render('profileUser', { data, formatDate })
            })
            .catch((err) => {
                res.send(err)
            });
    }
}

module.exports = Controller