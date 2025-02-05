/**
 * Read all environment variable configuration files to process.env
 * 处理环境变量的类型格式 （The boolean type read by loadEnv is a string）
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
        console.error(error);
      }
    }
    ret[envName] = realName;
  }
  return ret;
}
