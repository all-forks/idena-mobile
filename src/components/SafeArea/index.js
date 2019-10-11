import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'

export default function SafeArea({ children }) {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
}

SafeArea.propTypes = {
  children: PropTypes.node.isRequired,
}
