const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => console.log(hash))
});

let hashedPassword = '$2a$10$TeDcuFMxsjQKdoGLl3dYf./VDVxdQWLtBSy4beMFi2MsjYLg61dKO';

bcrypt.compare(password, hashedPassword, (err, res) => console.log(res));


