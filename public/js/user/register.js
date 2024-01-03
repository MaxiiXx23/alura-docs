const baseUrl = 'http://localhost:3000'

const form = document.getElementById('form-cadastro')

async function handleRegisterUser(name, password) {
  await axios.post(`${baseUrl}/user/register`, {
    name,
    password,
  })

  alert('User created!')
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const inputName = form['input-usuario']
  const inputPassword = form['input-senha']

  handleRegisterUser(inputName.value, inputPassword.value)
  inputName.value = ''
  inputPassword.value = ''
})
