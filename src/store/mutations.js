/**
 * motations文件，存放vuex中的motation
 */

export const increment = state => {
  state.count++
  state.history.push('increment')
}

export const decrement = state => {
  state.count--
  state.history.push('decrement')
}

export const updateGroup = (state,groupList) => {
  state.groupList = groupList;
}

export const setSelfPos = (state, selfPos) => {
	state.selfPos = selfPos;
}

export const setOhterfPos = (state, otherPos) => {
	state.otherPos = otherPos;
}
