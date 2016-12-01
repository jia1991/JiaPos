/**
 * action文件，主要配置vuex中的action函数
 */
import Vue from 'vue'

export const increment = ({ commit }) => commit('increment')
export const decrement = ({ commit }) => commit('decrement')
// export const updateGroup = ({ commit }) => commit('updateGroup')

export const incrementIfOdd = ({ commit, state }) => {
  if ((state.count + 1) % 2 === 0) {
    commit('increment')
  }
}

export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('decrement')
  }, 1000)
}

export const updateGroupDevs = ({commit, state},groupDevs) => {
	var groupList = state.groupList
	for (var i = groupList.length - 1; i >= 0; i--) {
		if(groupList[i].jname ==groupDevs.gname) {
			Vue.set(groupList[i], 'devs', groupDevs.devs);
			break
		}
	}
	//console.log(groupList)
	commit('updateGroup', groupList)
}
