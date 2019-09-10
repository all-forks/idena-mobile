import dict from './mock-words'

function getRandomHint() {
  const randomIndex = currentIndex => Math.floor(Math.random() * currentIndex)
  const nextIndex = randomIndex(dict.length)

  const firstWord = dict[nextIndex]
  const secondWord = dict[randomIndex(nextIndex)]
  const thirdWord = dict[randomIndex(nextIndex)]
  const fourthWord = dict[randomIndex(nextIndex)]

  // while (secondWord === firstWord) {
  //   secondWord = words[randomIndex(nextIndex)]
  // }
  // const
  console.info(nextIndex)
  return [firstWord, secondWord, thirdWord, fourthWord].map(
    ({ name, desc }) => ({
      name,
      desc: desc || name,
    })
  )
}

export default {
  getRandomHint,
}
