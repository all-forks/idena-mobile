import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import dayjs from 'dayjs'

import styles from './styles'

export default function Drafts() {
  const [drafts, updateDrafts] = useState([])
  const [isDeleteModalVisible, setToggleDeleteModalVisible] = useState(false)
  const [selectedDraftIdx, setSelectedDraftIdx] = useState(null)
  const [isOptionsVisible, setOptionsVisible] = useState(false)

  useEffect(() => {
    async function fetchAsyncStorageData() {
      try {
        const draftsStorage = await AsyncStorage.getItem('@drafts')
        if (draftsStorage === null) return
        updateDrafts(JSON.parse(draftsStorage))
        console.info(drafts)
      } catch (error) {
        console.info(error)
      }
    }
    fetchAsyncStorageData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleDraftAction(idx) {
    setOptionsVisible(!isOptionsVisible)
    setSelectedDraftIdx(idx)
  }

  async function handleDeleteDraft(selectedIndex) {
    const res = drafts.filter((_, i) => i !== selectedIndex)
    const draftsStorage = await AsyncStorage.getItem('@drafts')

    if (draftsStorage === null) return
    await AsyncStorage.setItem('@drafts', JSON.stringify(res))

    updateDrafts(res)
    setSelectedDraftIdx(null)
    setOptionsVisible(!isOptionsVisible)
    setToggleDeleteModalVisible(!isDeleteModalVisible)
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {drafts && drafts.length > 0 ? (
        <>
          {drafts.map(({ pics, nextOrder, date, selectedWordPairs }, idx) => (
            <View
              key={idx}
              style={{
                marginBottom: 30,
                opacity:
                  selectedDraftIdx !== null && selectedDraftIdx !== idx
                    ? 0.5
                    : 1,
              }}
            >
              <TouchableOpacity onLongPress={() => handleDraftAction(idx)}>
                <Image
                  source={{ uri: pics[nextOrder[0]] }}
                  resizeMode="cover"
                  style={{
                    borderRadius: 8,
                    width: 160,
                    height: 160,
                  }}
                />
                <Text
                  style={{
                    marginTop: 15,
                    color: 'rgb(83,86,92)',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  {selectedWordPairs.name} / {selectedWordPairs.desc}
                </Text>
                <Text
                  style={{
                    marginTop: 15,
                    color: 'rgb(150,153,158)',
                    fontSize: 14,
                  }}
                >
                  {dayjs(date).format('DD.MM.YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          {isOptionsVisible && (
            <View
              style={{
                position: 'absolute',
                left: Dimensions.get('window').width / 3.25 - 25,
                bottom: 0,
                backgroundColor: 'rgb(83,86,92)',
                paddingVertical: 20,
                paddingHorizontal: 16,
                width: 196,
                borderRadius: 8,
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: '#fff' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setToggleDeleteModalVisible(true)}
              >
                <Text style={{ color: '#fff' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal
            isVisible={isDeleteModalVisible}
            style={{ justifyContent: 'flex-end' }}
          >
            <View style={[styles.modalLg, styles.modal]}>
              <Text style={[styles.text, { fontSize: 20, textAlign: 'left' }]}>
                Delete Draft?
              </Text>
              <Text style={styles.profileInfoRowTitle}>
                This action is irreversible
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ flex: 1 }}
                  onPress={() => handleDeleteDraft(selectedDraftIdx)}
                >
                  <Text style={[styles.address, { fontSize: 15 }]}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ flex: 1 }}
                  onPress={() =>
                    setToggleDeleteModalVisible(!isDeleteModalVisible)
                  }
                >
                  <Text style={[styles.text, { fontSize: 15 }]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.title}>No Drafts</Text>
          <Text style={styles.description}>
            When you create flips and save them as drafts they will be appear
            here.
          </Text>
        </View>
      )}
    </ScrollView>
  )
}
