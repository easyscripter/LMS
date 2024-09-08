#stage 1
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

#stage 2
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/dist ./dist
COPY --from=deps /app/prisma ./prisma
COPY --from=deps /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/main"]