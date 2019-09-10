import callRpc from './api'

export default async function getBalance(address) {
  const { result } = await callRpc('dna_getBalance', { address })
  return result
}
