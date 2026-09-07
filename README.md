# ClipForge

## Run locally
1. Install Node.js 18+
2. Open the project folder
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000`

## Deploy on Render
- Push this folder to a GitHub repository.
- Create a new Web Service.
- Build command: `npm install`
- Start command: `npm start`

The server includes `/health` and `/api/analyze`.

## Production integration
The included backend validates URLs and returns a safe demo format list. Connect an authorized media API/provider for any actual media processing and enforce your rights/terms requirements.
