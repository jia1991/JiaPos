/**
 * getter文件，将获取vuex.state内容的方法封装存放
 */

export const count = state => state.count

const limit = 5

export const recentHistory = state => {
  const end = state.history.length
  const begin = end - limit < 0 ? 0 : end - limit
  return state.history
    .slice(begin, end)
    .toString()
    .replace(/,/g, ', ')
}
