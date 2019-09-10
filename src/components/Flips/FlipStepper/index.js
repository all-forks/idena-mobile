// Default imports
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function FlipStepper({ activeStep, children, pair }) {
  return (
    <Fragment>
      <Fragment>{children[activeStep]}</Fragment>
      {pair && <Fragment>{children[activeStep + 1]}</Fragment>}
    </Fragment>
  )
}

FlipStepper.propTypes = {
  children: PropTypes.node.isRequired,
  activeStep: PropTypes.number,
  pair: PropTypes.bool,
}
