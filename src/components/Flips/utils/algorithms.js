import { encode } from 'rlp'

function perm(maxValue) {
  const permArray = new Array(maxValue)
  for (let i = 0; i < maxValue; i += 1) {
    permArray[i] = i
  }
  for (let i = maxValue - 1; i >= 0; i -= 1) {
    const randPos = Math.floor(i * Math.random())
    const tmpStore = permArray[i]
    permArray[i] = permArray[randPos]
    permArray[randPos] = tmpStore
  }
  return permArray
}

function shufflePics(pics, shuffledOrder, seed) {
  const newPics = []
  const cache = {}
  const firstOrder = new Array(4)

  seed.forEach((value, idx) => {
    newPics.push(pics[value])
    firstOrder[value] = idx
    cache[value] = newPics.length - 1
  })

  const secondOrder = shuffledOrder.map(value => cache[value])

  return {
    pics: newPics,
    orders:
      Math.random() < 0.5
        ? [firstOrder, secondOrder]
        : [secondOrder, firstOrder],
  }
}

function shuffle(arr) {
  let currentIndex = arr.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = temporaryValue
  }

  return arr
}

function toHex(pics, order) {
  const seed = perm(4)
  const shuffled = shufflePics(pics, order, seed)

  const rlp = encode([
    shuffled.pics.map(src =>
      Uint8Array.from(atob(src.split(',')[1]), c => c.charCodeAt(0))
    ),
    shuffled.orders,
  ])
  return `0x${rlp.toString('hex')}`
}

export default {
  perm,
  shuffle,
  shufflePics,
  toHex,
}
