import callRpc from '../api'

export default async function killIdentity(from) {
  const { data } = await callRpc('/dna_sendTransaction', { from })
  return data
}
