class LocalCache {
  setCache(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key) {
    const val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
  }
  deleteCache(key) {
    return localStorage.removeItem(key)
  }
  clearCache() {
    return localStorage.clear()
  }
}

export default new LocalCache()
