import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export default function useFlips() {
  const [flips, setFlips] = useState([])

  useEffect(() => {
    async function fetchDraftedFlips() {
      try {
        const savedFlips = await AsyncStorage.getItem('draftedFlips')
        if (savedFlips.length > 0) {
          setFlips(savedFlips)
        }
      } catch (error) {
        console.info(error)
      }
    }

    fetchDraftedFlips()
  }, [])

  const getDraft = useCallback(id => flips.find(item => item.id === id), [
    flips,
  ])

  const deleteFlip = useCallback(async ({ id }) => {
    try {
      const draftedFlips = await AsyncStorage.getItem('draftedFlips')

      const newSavedFlips = draftedFlips.filter(item => item.id !== id)

      await AsyncStorage.setItem('draftedFlips', newSavedFlips)

      setFlips(prevFlips => prevFlips.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }, [])

  //   const saveFlip = useCallback((id) => )
  /*
  const saveDraft = useCallback(draft => {
    setFlips(prevFlips => {
    })
  })
  */
  return { flips, getDraft, deleteFlip }
}
