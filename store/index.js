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
  addFriends: function(state, friendList) {
    state.friends.push(...friendList)
  },
  addGroups: function(state, groupList) {
    state.groups.push(...groupList)
  },
  addChats: function(state, chatList) {
    state.chat.push(...chatList)
  },
  addRequests: function(state, requestList) {
    state.request.push(...requestList)
  }
}
