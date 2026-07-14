# Stage 1: Build client
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN rm -f package-lock.json && npm install
COPY client/ client/
RUN npm -w client run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json server/
RUN rm -f package-lock.json && npm install --omit=dev
COPY server/ server/
COPY --from=build /app/client/dist client/dist
RUN mkdir -p server/data server/uploads
EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "server/src/index.js"]
