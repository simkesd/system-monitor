# system-monitor

## Overview

The app uses `node-cron` library to set up a cron job that runs on 5 minute interval and sends telegram notifications to provided chat id if system resources go over certain threshold.

## Usage

- Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` and `DATABASE_PATH` to appropriate `.env` file (`.env.development` for your local, and `.env.production` for production)
- Run `npm run dev` to start the cron with development env variables or
- Run `npm run prod` to start the cron with production env variables
