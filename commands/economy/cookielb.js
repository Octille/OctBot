const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'cookielb',
    description: '',
    aliases: ["clb"],
    async execute(message, args, cmd, client, Discord, profileData) {
        const memberid = {}
        profileModel.find({}, function(err, users) {
            let Data = users;
            console.log(Data.Items)
               memberid[users.userID] = (memberid[users.userID] || 0) + users.coins
 
        }).then(err =>  {
            setTimeout(() => {
                console.log(memberid)
            }, 2000)
        })
    }
 

}