exports.join = 'insert into user(user_id,user_name,user_pwd,user_salt,user_tel,user_email,user_photo) values (?,?,?,?,?,?,?)'
exports.getUserIdx = 'select user_idx userIdx from user where user_id = ?'
exports.saveKwd = 'insert into userkey(uk_user_idx,uk_key_idx,uk_id,uk_text,uk_photo) values (?,?,?,?,?)'


exports.getSalt = 'select user_salt userSalt from user where user_id = ?'
exports.login = 'select user_id,user_pwd from user where user_id = ? and user_pwd = ?'