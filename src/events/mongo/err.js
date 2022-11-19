const chalk = require('chalk');

module.exports  ={
    name: 'connecting',
    once: true,
    execute(err){
        console.log(`An error occurred with the database connection:\n${err}`);
    }
}