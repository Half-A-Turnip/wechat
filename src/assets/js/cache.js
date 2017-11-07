import storage from 'good-storage'

const USER_INFO_KEY = '__userInfo__'
const TASK_INDEX_KEY = '__taskIndex__'

/*个人信息*/
//设置个人信息
export function setUserInfoStorage(userInfo) {
  storage.set(USER_INFO_KEY, userInfo)
  return userInfo
}
export function loadUserInfo() {
  return storage.get(USER_INFO_KEY, [])
}
//任务选择时间
export function setTaskIndexStorage(taskIndex) {
  storage.set(TASK_INDEX_KEY, taskIndex)
  return taskIndex
}
export function loadTaskIndex() {
  return storage.get(TASK_INDEX_KEY, [])
}
