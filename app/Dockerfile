# Stage 1: Dependencies
FROM node:lts-alpine3.21 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Use --frozen-lockfile equivalent for npm to ensure reproducible builds
RUN npm ci --only=production

# Stage 2: Runner
FROM node:lts-alpine3.21 AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only what is needed with correct ownership
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=deps --chown=node:node /app/package.json ./package.json
COPY --chown=node:node index.js ./

# Use the non-root user provided by the image
USER node

EXPOSE 3000
CMD [ "node", "index.js" ]