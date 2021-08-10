class EventEmitter {
  actions = {}

  on = (key, callback) => {
    if (this.actions[key]) {
      this.actions[key].push(callback)
    } else {
      this.actions[key] = [callback]
    }
  }

  emit = (key, values) => {
    if (this.actions && this.actions[key] && this.actions[key].length > 0) {
      this.actions[key].forEach((callback) => {
        callback(values)
      })
    }
  }

  remove = (key, callback) => {
    this.actions[key] = this.actions[key].filter((fn) => fn !== callback)
  }
}

export default new EventEmitter()
