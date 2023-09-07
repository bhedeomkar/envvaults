const https = require("https");
const dotenv = require("dotenv");

async function fetchEnvData(data, url) {
  return new Promise((resolve, reject) => {
    try {
      https
        .get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            const envData = JSON.parse(data);
            if (envData.error) {
              reject("ENV VAULTS ERROR: " + envData.error);
            }
            if (envData?.vault?.envs) {
              resolve(envData.vault.envs);
            } else {
              reject("ENV VAULTS ERROR: No envs found in response");
            }
          });
        })
        .on("error", (error) => {
          reject("ENV VAULTS ERROR: " + error);
        });
    } catch (error) {
      reject("ENV VAULTS ERROR: " + error);
    }
  });
}

async function load() {
  try {
    dotenv.config();
    const data = {
      AID: process.env.EV_AID,
      KEY: process.env.EV_KEY,
    };

    if (!data?.AID || !data?.KEY) {
      return console.error(
        "ENV VAULTS WARNING: enviroment variables loaded from .env file, but AID or KEY are missing."
      );
    }

    const url = "https://api.envvaults.com/";
    const apiUrl = new URL(url);

    apiUrl.searchParams.append("AID", data.AID);
    apiUrl.searchParams.append("KEY", data.KEY);

    const res = await fetchEnvData(data, apiUrl);

    Object.keys(res).forEach((key) => {
      process.env[key] = res[key];
    });
  } catch (error) {
    console.log(error);
  }
}

if (typeof module.exports === "object") {
  module.exports = {
    load,
  };
} else if (typeof exports === "object" && typeof module === "object") {
  exports.load = load;
}
