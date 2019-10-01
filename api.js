import reactotron from 'reactotron-react-native'
import { URL } from './config'

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
    const json = await resp.json()
    return json
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

export async function getBalance(address) {
  const { result } = await callRpc('dna_getBalance', { address })
  return result
}

export async function activateInviteCode(key, address) {
  const { result, error } = await callRpc('dna_activateInvite', {
    key,
    address,
  })

  if (error) {
    return error
  }

  return result
}

export async function fetchChain() {
  const { result, error } = await callRpc('bcn_syncing')

  if (error) {
    return error
  }

  return result
}
