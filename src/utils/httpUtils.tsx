import { config } from "../config"
import { getAuthToken } from "./authUtils"

export async function httpGet(url: string, queryParams?: Record<string, string>, notAuth?: boolean) {
  const params = new URLSearchParams(queryParams).toString()
  let fullURL = `${config.API_URL}${url}`

  if (params) {
    fullURL += `?${params}`
  }

  const response = {
    status: 500,
    data: null
  } as IResponse

  let headers = {
    "Content-Type": "application/json",
  } as Record<string, string>

  if (!notAuth) {
    headers = {...headers, "AUTH-TOKEN": getAuthToken()}
  }

  try {
    const res = await fetch(fullURL, {
      method: "GET",
      headers: headers
    })

    response.status = res.status
    response.data = await res.json()
  } catch (error) { }

  return response
}

export async function httpPost(url: string, payload?: any, notAuth?: boolean) {
  const fullURL = `${config.API_URL}${url}`

  const response = {
    status: 500,
    data: null
  } as IResponse

  let headers = {
    "Content-Type": "application/json",
  } as Record<string, string>

  if (!notAuth) {
    headers = {...headers, "AUTH-TOKEN": getAuthToken()}
  }

  try {
    const res = await fetch(fullURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    })

    response.status = res.status
    response.data = await res.json()
  } catch (error) { }

  return response
}

export async function httpPut(url: string, payload: any, notAuth?: boolean) {
  const fullURL = `${config.API_URL}${url}`

  const response = {
    status: 500,
    data: null
  } as IResponse

  let headers = {
    "Content-Type": "application/json",
  } as Record<string, string>

  if (!notAuth) {
    headers = {...headers, "AUTH-TOKEN": getAuthToken()}
  }

  try {
    const res = await fetch(fullURL, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload)
    })

    response.status = res.status
    response.data = await res.json()
  } catch (error) { }

  return response
}

export async function httpDelete(url: string, notAuth?: boolean) {
  const fullURL = `${config.API_URL}${url}`

  const response = {
    status: 500,
    data: null
  } as IResponse

  let headers = {
    "Content-Type": "application/json",
  } as Record<string, string>

  if (!notAuth) {
    headers = {...headers, "AUTH-TOKEN": getAuthToken()}
  }

  try {
    const res = await fetch(fullURL, {
      method: "DELETE",
      headers: headers
    })

    response.status = res.status
    response.data = await res.json()
  } catch (error) { }

  return response
}
