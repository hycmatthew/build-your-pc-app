import React from 'react'
import ReactGA from 'react-ga'

const useAnalyticsEventTracker = (pageName: string) => {
  const eventTracker = (action = 'Navigate action', label = 'Navigate label') => {
    ReactGA.event({ category: pageName, action, label })
  }
  return eventTracker
}

export default useAnalyticsEventTracker
