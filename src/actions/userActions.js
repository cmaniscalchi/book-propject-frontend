const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`

export function loginUser(name, password) {
  console.log("name & pw:", name, password)
  return ({
    type: "LOGIN_USER",
    payload: [name, password]
  })
}
