export const state = () => ({
  avatar: '',
  nickname: '',
  mobile: '',
  friends: [],
  groups: [],
  chat: [],
  request: []
})

export const mutations = {
  setNickname: function(state, name) {
    state.nickname = name
  },
  setAvatar: function(state, avatar) {
    state.avatar = avatar
  },
  setMobile: function(state, mobile) {
    state.mobile = mobile
  },
  addFriends: function(state, friends) {
    state.friends.push(...friends)
  },
  addGroups: function(state, groups) {
    state.groups.push(...groups)
  },
  addChats: function(state, groups) {
    state.chat.push(...groups)
  },
  addRequests: function(state, groups) {
    state.request.push(...groups)
  }
}
