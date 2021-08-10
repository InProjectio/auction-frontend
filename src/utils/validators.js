import moment from 'moment'
import { deleteAccents } from './utils'

export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return regex.test(String(email).toLowerCase())
}

export function validateDate(value) {
  const date = moment(value, 'DD/MM/YYYY')
  return date.isValid()
}

export function validateCity(city) {
  const regex = /^[a-zA-Z ]*$/g
  return regex.test(city)
}

export function validateName(name) {
  const str = deleteAccents(name)
  const regex = /^[a-zA-Z0-9\-/_ ]*$/g
  return regex.test(str)
}

export function validateNameAndNumber(name) {
  const str = deleteAccents(name)
  const regex = /^[a-zA-Z0-9\-/_ ]*$/g
  return regex.test(str)
}

export function validateDomain(name) {
  const regex = /^[a-zA-Z+-_]*$/g
  return regex.test(name)
}

export function validatePhoneNumber(phoneNumber) {
  const regex = /^0+\d{9}$/g
  return regex.test(phoneNumber)
}

export function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[±!@#$%^&*()_+~`=]).{8,}$/g
  return regex.test(password)
}

export function validateUsername(name) {
  const regex = /^[a-zA-Z0-9]*$/g
  return regex.test(name)
}
