exports.getCategory = 'select * from category'
exports.getCategoryByName = 'select * from category where CTG_CATEGORY LIKE ?'
exports.getKeyword = 'select * from keyword'
exports.getKeywordByName = 'select * from keyword where KEY_WORD LIKE ?'

exports.dupliIdCheck = 'select count(*) result from user where user_id = ?'
exports.dupliPhoneCheck = 'select count(*) result from user where user_tel = ?'
exports.dupliMailCheck = 'select count(*) result from user where user_email = ?'