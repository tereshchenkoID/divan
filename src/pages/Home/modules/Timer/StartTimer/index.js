import React, { useEffect, useState } from 'react'

import { useWebWorker } from 'hooks/useWorker'

const StartTimer = ({ data, delta }) => {
  const [value, setValue] = useState(null)
  const { result, run } = useWebWorker(k => k * 2)

  useEffect(() => {
    // Функция, которая будет вызываться каждые 30 секунд
    const fetchData = () => {
      // Выполните запрос на сервер здесь
      console.log('Fetching data from server...')
    }

    const a = setInterval(() => {
      console.log(new Date().getTime())
    }, 1000)

    // Очистите интервал при размонтировании компонента
    return () => clearInterval(a)
  }, [])

  const handleClick = () => {
    setValue(10)
    run(10)
  }

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      {result}
    </div>
  )
}

export default StartTimer
