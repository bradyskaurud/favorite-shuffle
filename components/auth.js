const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        console.log('ERROR: hashPassword - Problem hashing password', error);
    }
}

function comparePassword(password, hash) {
    try {
        return bcrypt.compare(password, hash);
    } catch (error) {
        console.log('ERROR: comparePassword - Problem comparing password', error);
    }
}

module.exports = {
    hashPassword,
    comparePassword,
};