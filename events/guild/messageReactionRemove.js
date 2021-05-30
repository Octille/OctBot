const ReactionRoleSchema = require('../../models/ReactionRole');


module.exports = async (Discord, client, reaction, user) => {
    const reactionData = await ReactionRoleSchema.findOne({
		GuildID: reaction.message.guild.id,
		MessageID: reaction.message.id,
		Emoji: reaction.emoji.name,
	});

	if (reaction.emoji.name === reactionData.Emoji){
		if(reaction.message.id == reactionData.MessageID){
			await reaction.message.guild.members.cache.get(user.id).roles.remove(reactionData.RoleID);
		}
	}
}