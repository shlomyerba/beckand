import nodeFetch from 'node-fetch';

const JSON_CONTENT_TYPE = 'application/json';

function getJsonHeaders() {
  return {
    Accept: JSON_CONTENT_TYPE,
    'Content-Type': JSON_CONTENT_TYPE,
  };
}

export async function fetchGet(url: string, extraHeaders: any = {}) {
  let headers = getJsonHeaders();
  if (extraHeaders) {
    headers = Object.assign(headers, extraHeaders);
  }
  const request = {
    method: 'GET',
    headers
  };
  const result = await nodeFetch(url, request);
  return result.json();
}

export async function fetchPost(url: string, data: any, extraHeaders: any = {}) {
  let headers = getJsonHeaders();
  if (extraHeaders) {
    headers = Object.assign(headers, extraHeaders);
  }
  const request = {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  };

  try {
    const result = await nodeFetch(url, request);
    return result.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchDelete(url: string, data: any, extraHeaders: any = {}) {
  let headers = getJsonHeaders();
  if (extraHeaders) {
    headers = Object.assign(headers, extraHeaders);
  }
  const request = {
    method: 'Delete',
    body: JSON.stringify(data),
    headers
  };

  try {
    const result = await nodeFetch(url, request);
    return result.json();
  } catch (error) {
    throw error;
  }
}