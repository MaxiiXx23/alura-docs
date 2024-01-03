function createCookie(key, token) {
  document.cookie = `${key}=${token};path=/`
}

function getCookie(key) {
  return document.cookie
    .split('; ')
    .find((coockie) => coockie.startsWith(`${key}=`))
    ?.split('=')[1]
}

function removeCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 jan 1970 00:00:00`
}

export { createCookie, getCookie, removeCookie }
