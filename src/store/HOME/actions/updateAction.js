import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

const setUpdate = (id, value) => async dispatch => {
  const { get } = useRequest('feed')

  try {
    let data

    if (id) {
      data = await get(`/EVENT/${id}`)
    } else if (value) {
      data = value
    } else {
      data = {}
    }

    dispatch({
      type: types.SET_UPDATE,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}

export { setUpdate }
