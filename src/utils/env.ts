export function getAppEnvConfig() {
  const ENV = import.meta.env;
  console.log(ENV);
  const { VITE_GLOB_API_URL, VITE_GLOB_APP_TITLE } = ENV;

  return {
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_TITLE
  };
}
