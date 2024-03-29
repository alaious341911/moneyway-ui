import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import axios from 'axios'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default axios.create({
  baseURL: 'http://localhost:8080',
})

export function decodeErrorStatus(err: number): string {
  let errorMsg = ''
  if (err === 200) {
    errorMsg = 'No Server Response'
  } else if (err === 400) {
    errorMsg = 'Missing required filed(s) - Bad request'
  } else if (err === 401 || err === 403) {
    errorMsg = 'Unauthorized action'
  } else if (err === 302) {
    errorMsg = 'Duplicate action detected'
  } else {
    errorMsg = 'proccess failed. Try again'
  }

  return errorMsg
}

export function  capitalizeFirstLetter(myString) {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
}

