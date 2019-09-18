import dict from './mock-words'

const wordsObj = {}

function getRandomHint() {
  const randomIndex = currentIndex => Math.floor(Math.random() * currentIndex)
  const nextIndex = randomIndex(dict.length)

  const firstWord = dict[nextIndex]
  const secondWord = dict[randomIndex(nextIndex)]

  // for (let i = 0; i < 9; i++) {
  const wordsPair = [firstWord, secondWord].map(({ name, desc }) => ({
    name,
    desc: desc || name,
  }))

  wordsObj[`words${Math.random()}`] = wordsPair
  console.info(wordsObj)
  // }

  if (wordsObj.length < 9) {
    getRandomHint()
    // return
  }
  return { id: -1, words: wordsObj }
}

export function getKeyWordsHint(flipKeyWordPairs, publishedFlips, id) {
  if (!flipKeyWordPairs || !flipKeyWordPairs.length) return getRandomHint()

  const pairId = id && id >= 0 && id < flipKeyWordPairs.length ? id : 0

  const hint = flipKeyWordPairs[pairId]

  const nextIndex1 = hint.words[0]
  const nextIndex2 = hint.words[1]
  const firstWord = dict[nextIndex1] || {
    name: 'Error',
    descr: 'No word found',
  }
  const secondWord = dict[nextIndex2] || {
    name: 'Error',
    descr: 'No word found',
  }

  // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < 9; i++) {
  const wordsPair = [firstWord, secondWord].map(({ name, desc }) => ({
    name,
    desc: desc || name,
  }))

  wordsObj[`words${Math.random()}`] = wordsPair
  console.info(wordsObj)
  // }

  if (wordsObj.length < 9) {
    getNextKeyWordsHint(flipKeyWordPairs, publishedFlips, id + 1, 40)
  }

  // const words
  // return { id, words: wordsObj }
}

function getNextKeyWordsHint(
  flipKeyWordPairs,
  publishedFlips,
  currId = -1,
  i = 50
) {
  if (!flipKeyWordPairs || !flipKeyWordPairs.length) return getRandomHint()

  const nexIdx =
    currId < 0
      ? 0
      : flipKeyWordPairs.indexOf(
          flipKeyWordPairs.find(({ id }) => id === currId)
        ) + 1
  console.info(nexIdx)

  const nextKeyWordPair =
    nexIdx >= flipKeyWordPairs.length
      ? flipKeyWordPairs[0]
      : flipKeyWordPairs[nexIdx]

  console.info(nextKeyWordPair)

  try {
    const isUsed =
      (nextKeyWordPair && nextKeyWordPair.used) ||
      (nextKeyWordPair &&
        publishedFlips.find(({ id }) => id === nextKeyWordPair.id))

    if (isUsed) {
      if (i < 0) return getRandomHint()

      return getNextKeyWordsHint(
        flipKeyWordPairs,
        publishedFlips,
        nextKeyWordPair.id,
        i - 1
      )
    }

    if (wordsObj.length >= 9) {
      return { id: nextKeyWordPair.id, words: wordsObj }
    }

    return getKeyWordsHint(
      flipKeyWordPairs,
      publishedFlips,
      nextKeyWordPair.id + 1
    )
  } catch (err) {
    console.info(err)
  }
}

export default {
  getRandomHint,
  getNextKeyWordsHint,
}
