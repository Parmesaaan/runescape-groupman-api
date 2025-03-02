FROM node:20-alpine AS builder
WORKDIR /app
COPY . .

RUN npm install -g typescript ts-node && npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./

CMD [ "npm", "start" ]