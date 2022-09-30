import { onValue, ref } from 'firebase/database'
import React from 'react'
import { useParams } from 'react-router-dom'

export let useTimeout = (timeout_ms) => {
  let [is_timeout, set_is_timeout] = React.useState(false)

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      set_is_timeout(true)
    }, timeout_ms)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return is_timeout
}

/** @returns {React.MutableRefObject<HTMLDialogElement>} */
export let useDialogRef = () => {
  return React.useRef()
}

export let useConnected = (database) => {
  let [is_connected, set_is_connected] = React.useState(true)
  const connectedRef = ref(database, '.info/connected')
  React.useEffect(() => {
    let unsubscribe = onValue(connectedRef, (snap) => {
      set_is_connected(snap.val())
    })
    return () => {
      unsubscribe()
    }
  })
  return is_connected
}

export let useDate = (every_ms = 1000) => {
  let [date, set_date] = React.useState(Date.now())

  React.useEffect(() => {
    let interval = setInterval(() => {
      set_date(Date.now())
    }, every_ms)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return date
}

let warnings_given = new Map()

export function with_translation(translations) {
  return function useTranslation(overwrite_language = null) {
    let { language: language_from_params } = useParams()

    let language = overwrite_language ?? language_from_params

    return (english) => {
      let sentence_translations = translations[english]

      if (sentence_translations == null) {
        if (!warnings_given.has(english)) {
          //console.log(`🤷‍♀️📖 No translation found for "${english}"`);
          warnings_given.set(english, true)
        }
        return english
      }

      let translation = sentence_translations[language]

      if (translation == null) {
        if (!warnings_given.has(`${english}/${language}`)) {
          // console.warn(`No "${language}" translation found for "${english}"`);
          warnings_given.set(`${english}/${language}`, true)
        }

        return english
      }

      return translation
    }
  }
}
