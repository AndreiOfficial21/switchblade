module.exports = class PermissionUtils {
  static isDeveloper (client, user) {
    const botGuild = client.guilds.cache.get(process.env.BOT_GUILD)
    const developerRole = botGuild && botGuild.roles.cache.get(process.env.DEVELOPER_ROLE)
    const isDeveloper = (developerRole && developerRole.members.has(user.id)) || (process.env.DEVELOPER_USERS && process.env.DEVELOPER_USERS.split(',').includes(user.id))
    return isDeveloper
  }

  static specialRole (client, user) {
    const botGuild = client.guilds.cache.get(process.env.BOT_GUILD)
    const member = botGuild && botGuild.members.cache.get(user.id)
    if (member) {
      return member.roles.cache.filter(r => r.hoist).sort((a, b) => b.position - a.position).first()
    }
  }

  static isManager (client, user) {
    const botGuild = client.guilds.cache.get(process.env.BOT_GUILD)
    const managerRole = botGuild && botGuild.roles.cache.get(process.env.MANAGER_ROLE)
    const isManager = (managerRole && managerRole.members.cache.has(user.id)) || this.isDeveloper(client, user)
    return isManager
  }
}
