export default async function callRpc(method, ...params) {
  try {
    const resp = await fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method,
        params,
        id: 1,
      }),
    })
    const json = await resp.json()
    return json
  } catch (error) {
    return { error }
  }
}
