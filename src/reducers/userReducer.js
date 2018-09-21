const initialUserState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

export default function userReducer(state = initialUserState, action) {
  console.log("userReducer:", state, action)
  switch (action.type) {
    default:
      return state
  }
}
