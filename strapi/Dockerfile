FROM node:18
WORKDIR /app
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "develop"]
