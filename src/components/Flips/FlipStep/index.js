// Default imports
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'

import FlipStepperControls from '../FlipStepper/FlipStepperControls'
import FlipProgressBar from '../FlipStepper/FlipStepperProgressBar'

import styles from './styles'

export default function FlipStep({
  key,
  title,
  description,
  activeStep,
  totalSteps,
  onPrev,
  onNext,
  onClose,
  onSubmitFlip,
  children,
}) {
  const [modal, setModal] = useState({
    visible: false,
    title: '',
    description: '',
    cancelButton: {
      title: '',
      action: () => {},
    },
    okButton: {
      title: '',
      action: () => {},
    },
  })

  function generateModal() {
    const defaultConfig = { visible: true }
    switch (activeStep) {
      case 0: {
        return {
          ...defaultConfig,
          title: 'Recover from draft?',
          description:
            'Use the draft to continue or delete it and create new flip',
          cancelButton: {
            title: 'Use draft',
            action: () => setModal({ ...modal, visible: false }),
          },
          okButton: {
            title: 'Create new',
            action: () => setModal({ ...modal, visible: false }),
          },
        }
      }
      case 1: {
        return {
          ...defaultConfig,
          title: 'Save flip as draft?',
          description:
            'A draft flip can be recovered and submitted only the nearest validation session. After the validatiton all drafts will be burnt',
          cancelButton: {
            title: 'Yes',
            action: () => setModal({ ...modal, visible: false }),
          },
          okButton: {
            title: 'No',
            action: () => setModal({ ...modal, visible: false }),
          },
        }
      }
      default:
        return modal
    }
  }

  function handleClose() {
    if (activeStep === 2 || activeStep === 3) {
      onClose()
    }

    setModal(generateModal())
  }

  return (
    <View style={styles.container}>
      <View key={key} style={styles.header}>
        <Button onPress={handleClose} title="Close" />

        <View style={[styles.titleContainer, activeStep === 3 && { flex: 1 }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {activeStep === 3 && <Button onPress={onSubmitFlip} title="Submit" />}
      </View>

      <View
        style={{
          marginTop: activeStep === 0 ? 32 : 5,
          marginBottom: 15,
          paddingHorizontal: 40,
          fontSize: activeStep === 0 ? 16 : 14,
        }}
      >
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={{ flex: 1 }}>{children}</View>

      <View style={styles.footer}>
        <FlipStepperControls
          onNextStep={onNext}
          onPrevStep={onPrev}
          activeStep={activeStep + 1}
          totalSteps={totalSteps}
        />
        <FlipProgressBar totalSteps={totalSteps} activeStep={activeStep + 1} />
      </View>

      <Modal
        isVisible={modal.visible}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => {
          setModal({ ...modal, visible: false })
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: 28,
            paddingHorizontal: 24,
            paddingVertical: 20,
            borderRadius: 8,
          }}
        >
          <Text style={styles.modalTitle}>{modal.title}</Text>
          <Text style={styles.modalDescription}>{modal.description}</Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={modal.cancelButton.action}
            >
              <Text style={styles.accentButtonText}>
                {modal.cancelButton.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={modal.okButton.action}
            >
              <Text style={styles.buttonText}>{modal.okButton.title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

FlipStep.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  key: PropTypes.number,
  activeStep: PropTypes.number,
  totalSteps: PropTypes.number,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  onSubmitFlip: PropTypes.func,
}
