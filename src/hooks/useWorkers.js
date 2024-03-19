import { useEffect, useRef, useState } from 'react'

const workerHandler = fn => {
  onmessage = event => {
    postMessage(fn(event.data))
  }
}

export const useWorkers = fn => {
  const [result, setResult] = useState(null)
  const workersRef = useRef(null)

  useEffect(() => {
    const worker = new Worker(URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`])))

    workersRef.current = worker
    worker.onmessage = event => setResult(event.data)
    return () => {
      worker.terminate()
    }
  }, [fn])

  return {
    result,
    run: value => workersRef.current.postMessage(value),
  }
}
