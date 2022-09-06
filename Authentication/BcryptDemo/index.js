const bcrypt = require('bcrypt');


//technique 1:
// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12); //the # inside genSalt is kinda like the difficulty; the higher number the longer it takes
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

//technique 2:
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}


const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('LOGGED YOU IN! SUCCESSFUL MATCH!')
    } else {
        console.log('INCORRECT')
    }
}


hashPassword('monkey');

login('monkey', '$2b$12$MA6mYdJyCBwMyaYpngLaounlFK3iTKh0YjMn/xrDXQt3x8q0fU01S')