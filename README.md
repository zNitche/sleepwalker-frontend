## Sleepwalker - Frontend

Part of [sleepwalker](https://github.com/zNitche/sleepwalker) project. 
React powered frontend for sleep monitoring and sleepwalking detection + prevention system.

---

### Technologies
- React 18.2
- Vite 4.5.0
- Typescript 5.0.2
- React Router 6.18
- MUI 5.14
- chart.js 4.4.0
- nginx

### Features
- Dashboard for session details (with chart.js graphs).
- User authentication.
- Managing user settings & API Key.
- Managing logs sessions.
- Sessions filtering based on start and end date.

### Setup
#### Dev
1. Create `.env` file
```
cp .env.template .env
```
2. Set `VITE_API_URL` to API url, for example
```
http://127.0.0.1:8000/api
```
3. Install dependencies
```
npm i
```
4. Start dev server
```
npm run dev
```
#### Prod
1. Create `.env` file
```
cp .env.template .env
```
2. Set `VITE_API_URL` to API url, for example
```
http://127.0.0.1:8000/api
```
3. Build docker image
```
docker compose build
```
4. Serve app via nginx
```
docker compose up -d
```
