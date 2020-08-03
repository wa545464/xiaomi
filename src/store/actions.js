export default {
    saveUsername ({ commit }, username) {
        commit('saveUsername', username)
    },
    saveCartCount ({ commit }, count) {
        commit('saveCartCount', count)
    },
    logout ({ commit }) {
        commit('saveUsername', '')
        commit('saveCartCount', 0)
    }
}