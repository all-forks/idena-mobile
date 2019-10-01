import { fetchChain } from '../../../api'

export default async function() {
  const { result } = await fetchChain()
  console.info(result)
  return result
}
