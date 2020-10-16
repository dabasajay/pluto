export const environment = process.env.REACT_APP_BUILD_ENV || 'development';

export const API_BASE_URL: {
  [key: string]: string;
} = {
  development: 'http://localhost:8080',
  production: 'http://pluto.com',
}

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL[environment]}/auth`,
  USER: `${API_BASE_URL[environment]}/user`,
  PROJECT: `${API_BASE_URL[environment]}/project`,
  COMMENT: `${API_BASE_URL[environment]}/comment`,
  LIKE: `${API_BASE_URL[environment]}/like`,
  SEARCH: `${API_BASE_URL[environment]}/search`,
  AGG: `${API_BASE_URL[environment]}/agg`,
}