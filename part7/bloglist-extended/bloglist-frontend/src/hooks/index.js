import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState(null)

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data)
    })
  }, [baseUrl])

  return resources
}

// eslint-disable-next-line import/prefer-default-export
export { useResource }
