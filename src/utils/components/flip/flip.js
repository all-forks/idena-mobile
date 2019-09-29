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

function getRandomHint1() {
  const randomIndex = currentIndex => Math.floor(Math.random() * currentIndex)
  const nextIndex = randomIndex(dict.length)

  const firstWord = dict[nextIndex]
  const secondWord = dict[randomIndex(nextIndex)]

  const wordsPair = [firstWord, secondWord].map(({ name, desc }) => ({
    name,
    desc: desc || name,
  }))

  console.info(wordsPair)

  return wordsPair
}

export function getKeyWordsHint(flipKeyWordPairs, publishedFlips, id) {
  if (!flipKeyWordPairs || !flipKeyWordPairs.length) return getRandomHint1()

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
  if (!flipKeyWordPairs || !flipKeyWordPairs.length) return getRandomHint1()

  const result = flipKeyWordPairs.map((item, _) => {
    if (item.used || publishedFlips.find(({ id }) => id === item.id)) {
      return getRandomHint1()
    }

    const pairId =
      item.id && item.id >= 0 && item.id < flipKeyWordPairs.length ? item.id : 0

    const hint = flipKeyWordPairs[pairId]
    const nextIndex1 = hint.words[0]
    const nextIndex2 = hint.words[1]

    const firstWord = dict[nextIndex1] || { name: 'Error', desc: 'Error' }
    const secondWord = dict[nextIndex2] || { name: 'Error', desc: 'Error' }

    const wordsPair = [firstWord, secondWord].map(({ desc, name }) => ({
      name,
      desc: desc || name,
    }))

    return wordsPair
  })

  return result
}

export default {
  getRandomHint,
  getRandomHint1,
  getNextKeyWordsHint,
}
