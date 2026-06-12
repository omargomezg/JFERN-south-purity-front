# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies using legacy-peer-deps to avoid conflicts
RUN npm install --legacy-peer-deps

# Copy the entire Angular project
COPY . .

# Build the Angular application for production (includes SSR and Prerendering)
RUN npm run build

# Stage 2: Serve the built Angular application with Node.js
FROM node:20-alpine

# Set the working directory for the serving stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for production dependencies
COPY --from=build /app/package.json /app/package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production --legacy-peer-deps

# Copy the built output (both browser and server folders)
COPY --from=build /app/dist ./dist

# The server expects the 'browser' folder to be at dist/south-purity-front/browser relative to process.cwd()
# We set the environment variable for the port to match the user's previous preference
ENV PORT=8080

# Expose the port your server will listen on
EXPOSE 8080

# Command to run the Node.js SSR server
# The server.mjs file is the entry point for the Esbuild-based SSR bundle
CMD ["node", "dist/south-purity-front/server/server.mjs"]
