const xcv = exports;
const axios = require("axios");
const cred = require("./config.js");
const client_id = cred["clientID"];
const client_secret = cred["clientSecret"];
const account_id = cred["accountID"];
const secretToken = cred["secretToken"];
const api_base_url = "https://api.zoom.us/v2";
xcv.testing = async (req, res) => {
  try {
    const authResponse = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${account_id}`,
      {
        grant_type: "account_credentials",
        account_id: `${account_id}`,
        client_secret: `${client_secret}`,
      },
      {
        auth: {
          username: `${client_id}`,
          password: `${client_secret}`,
        },
      }
    );
    const access_token = authResponse.data.access_token;

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const payload = {
      topic: "topic",
      duration: 60,
      start_time: 10,
      type: 2,
    };
    const meetingResponse = await axios.post(
      `${api_base_url}/users/me/meetings`,
      payload,
      { headers }
    );
    res.redirect(meetingResponse["data"]["join_url"]);
    console.log(meetingResponse["data"]["join_url"]);
  } catch (error) {
    console.log(error);
  }
};
