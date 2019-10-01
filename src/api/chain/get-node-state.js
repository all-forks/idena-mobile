import { fetchChain } from '../../../api'

export default async function fetchNodeStatus() {
  const result = fetchChain()
  return result
}
