// eslint-disable-next-line no-undef
export const URL = __DEV__ ? 'http://localhost:9010' : 'http://localhost:9009'

export async function callRpc(method, ...params) {
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
    return resp.json()
  } catch (error) {
    return { error }
  }
}

export async function fetchFlipHashes(type) {
  const { result } = await callRpc(`flip_${type}Hashes`)
  return result
}

export async function fetchFlip(hash) {
  return callRpc('flip_get', hash)
}

export async function submitShortAnswers(answers, nonce, epoch) {
  const { result } = await callRpc(`flip_submitShortAnswers`, {
    answers,
    nonce,
    epoch,
  })
  return result
}

export async function submitLongAnswers(answers, nonce, epoch) {
  const { result } = await callRpc(`flip_submitLongAnswers`, {
    answers,
    nonce,
    epoch,
  })
  return result
}

export async function fetchBalance(address) {
  return callRpc('dna_getBalance', { address })
}

export async function activateInviteCode(to, key) {
  return callRpc('dna_activateInvite', {
    to,
    key,
  })
}

export async function fetchChain() {
  try {
    const sync = await callRpc('bcn_syncing')
    return sync
  } catch (error) {
    return { error }
  }
}
