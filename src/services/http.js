import { API_TIMEOUT_MS } from '../constants/api';

export const fetchJson = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  let response;

  try {
    response = await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The request timed out. Please try again.');
    }

    throw new Error('Unable to reach the service. Check your connection and try again.');
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();
      message = errorData.message || errorData.error || message;
    } catch (error) {
      // Ignore JSON parsing errors and use the default message.
    }

    throw new Error(message);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('The service returned an invalid response. Please try again.');
  }
};
