
FROM node:14-alpine3.10 as base
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./

# --- Prod build ---
# Stage 1: Build js files
FROM base as ts-compiler
RUN npm run build

# Stage 2: Remove ts dependencies
FROM node:14-alpine3.10 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./
RUN npm install --only=production

# Stage 3: Run in distroless image
FROM node:14-alpine3.10 as production
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
CMD ["index.js"]