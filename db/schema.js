
module.exports = {
    'mysql' : function (schema) {
        //console.log('mysql schema function call arguments', arguments);
        schema.define('Post', {
            title: String,
            content: String
        });
    },
    'mongodb' : function (schema) {
        schema.define('User', {
            name: String,
            phone: String
        });
    }
};
