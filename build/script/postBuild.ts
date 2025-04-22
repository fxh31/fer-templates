// import { runBuildConfig } from './buildConf';
const { runBuildConfig } = require('./buildConf');
import pkg from '../../package.json';

export const runBuild = async () => {
  try {
    const argvList = process.argv.slice(2);
    console.log(argvList);

    runBuildConfig();
  } catch (error) {
    console.log(error);
  }
};

runBuild();
