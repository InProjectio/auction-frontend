export const setItem = (key, value) => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'save',
    key,
    value
  }, '*')
}

export const getItem = (key) => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'get',
    key,
  }, '*')
}

export const getAllStorage = () => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'getAllStorage',
    key: 'getAllStorage'
  }, '*')
}

export const logout = () => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'logout',
    key: 'logout'
  }, '*')
}

export const login = (value) => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'login',
    key: 'login',
    value
  }, '*')
}

export const removeItem = (key) => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'remove',
    key,
  }, '*')
}

export const clear = () => {
  const iframe = document.getElementById('ifr')
  iframe.contentWindow.postMessage({
    action: 'clear',
  }, '*')
}
