import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const oauthGoogleRequest = async function (req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectURL = process.env.OAUTH_GOOGLE_URI;

  const oAuth2Client = new OAuth2Client(
    process.env.OAUTH_GOOGLE_CLIENT_ID,
    process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    redirectURL
  );

  //access-type:"offline"  for testing, force refesh token to be created and always sent, for production only "offline" to force refresh token to be created
  const genAuthURL = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: genAuthURL });
};

const oauthGoogleSession = async function (req: Request, res: Response) {
  const code = req.query.code as string;
  console.log("code", code);

  try {
    const redirectURL = process.env.OAUTH_GOOGLE_URI;

    const oAuth2Client = new OAuth2Client(
      process.env.OAUTH_GOOGLE_CLIENT_ID,
      process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      redirectURL
    );

    const response = await oAuth2Client.getToken(code as string);
    await oAuth2Client.setCredentials(response.tokens);
    console.log("Got token", response.tokens);
    const googleUser = oAuth2Client.credentials;
    console.log("Google user:", googleUser);
    //Utility fn(access_token)
    await getGoogleUserData(googleUser.access_token);
  } catch (error) {
    console.error("Error signing into Google", error);
  }

  res.redirect(303, "http://localhost:5173");
};

const getGoogleUserData = async function (access_token: unknown) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  const data = await response.json();
  console.log("google data:", data);
};

const oauthController = {
  oauthGoogleRequest,
  oauthGoogleSession,
};

export default oauthController;
