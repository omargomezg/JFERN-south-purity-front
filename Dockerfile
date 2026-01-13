# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Angular CLI globally and project dependencies
RUN npm install -g @angular/cli && npm install --force

# Copy the entire Angular project
COPY . .

# Build the Angular application for production
RUN ng build --configuration production

# Stage 2: Serve the built Angular application with a lightweight Node.js server
FROM node:20-alpine

# Set the working directory for the serving stage
WORKDIR /usr/src/app

# Copy only the built Angular application from the build stage
COPY --from=build /app/dist/south-purity-front ./public

# Install a lightweight web server (e.g., serve or http-server)
RUN npm install -g serve

# Expose the port your server will listen on
EXPOSE 8080

# Command to run the server
CMD ["serve", "-s", "public", "-l", "8080"]
