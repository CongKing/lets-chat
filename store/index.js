export const state = () => ({
  friends: [],
  groups: [],
  chat: [],
  request: []
})

export const mutations = {
  addFriends: function(state, friends) {
    state.friends.push(...friends)
  },
  addGroups: function(state, groups) {
    state.groups.push(...groups)
  },
  addChats: function() {
    state.chat.push(...groups)
  },
  addRequests: function() {
    state.request.push(...groups)
  }
}
