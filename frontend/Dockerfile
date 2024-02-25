# Use an official Node.js runtime as the parent image
FROM node:20.11.1-alpine3.18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application source code to the Docker image
COPY . .

# Build your Next.js application
RUN npm run build

# Start the application
CMD ["npm", "start"]
