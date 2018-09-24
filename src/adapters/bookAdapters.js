const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`

export default function bookSearchAdapter(input) {
  let urlSuffix = `book_search`
  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ input })
  }
  let response = fetch(`${BASE_URL}${urlSuffix}`, postConfig).then(res => res.json())
  return response
}
