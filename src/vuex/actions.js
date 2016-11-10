/**
 * action文件，主要配置vuex中的action函数
 */

export const increment = ({ dispatch }) => dispatch('INCREMENT')
export const decrement = ({ dispatch }) => dispatch('DECREMENT')

export const incrementIfOdd = ({ dispatch, state }) => {
  if ((state.count + 1) % 2 === 0) {
    dispatch('INCREMENT')
  }
}

export const incrementAsync = ({ dispatch }) => {
  setTimeout(() => {
    dispatch('INCREMENT')
  }, 1000)
}
