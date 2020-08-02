export default {
    saveUsername ({ commit }, username) {
        commit('saveUsername', username)
    },
    saveCartCount ({ commit }, count) {
        commit('saveCartCount', count)
    }
}