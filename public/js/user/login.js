import { createCookie } from '../../utils/cookies.js'

const baseUrl = 'http://localhost:3000'

const form = document.getElementById('form-login')

async function handleLoginUser(name, password) {
  try {
    const response = await axios.post(`${baseUrl}/user/auth`, {
      name,
      password,
    })

    createCookie('token', response.data.token)
    window.location.href = '/'
  } catch {
    alert(`User or Password invalid. Please, try again.`)
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const inputName = form['input-usuario']
  const inputPassword = form['input-senha']

  handleLoginUser(inputName.value, inputPassword.value)
  inputName.value = ''
  inputPassword.value = ''
})
