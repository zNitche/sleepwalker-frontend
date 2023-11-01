import { consts } from "../consts";
import { removeItem, setItem } from "./localStorageUtils";

export function getAuthToken() {
  const item = localStorage.getItem(consts.AUTH_TOKEN_STORAGE_KEY_NAME)
  return item ? item : "";
}

export function removeAuthToken() {
  removeItem(consts.AUTH_TOKEN_STORAGE_KEY_NAME)
}

export function setAuthToken(value: any) {
  setItem(consts.AUTH_TOKEN_STORAGE_KEY_NAME, value)
}

