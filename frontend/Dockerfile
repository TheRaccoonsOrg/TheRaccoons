# Use an official Node.js runtime as the parent image
FROM node:20.11.1-alpine3.18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/
# Install dependencies
RUN npm install

# Copy your application source code to the Docker image
COPY . .

ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_LISTMONK_API_URL

ARG DATABASE_URL

ARG AUTH_SECRET
ARG AUTH_TRUST_HOST

ARG RESEND_API_KEY

ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_SENTRY_DSN ${NEXT_PUBLIC_SENTRY_DSN}
ENV SENTRY_AUTH_TOKEN ${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_LISTMONK_API_URL ${NEXT_PUBLIC_LISTMONK_API_URL}

ENV DATABASE_URL ${DATABASE_URL}
ENV AUTH_SECRET ${AUTH_SECRET}
ENV AUTH_TRUST_HOST ${AUTH_TRUST_HOST}


ENV RESEND_API_KEY ${RESEND_API_KEY}
ENV NEXT_PUBLIC_APP_URL ${NEXT_PUBLIC_APP_URL} 

ENV NODE_ENV production

# Generate Prisma Client
RUN npm run db:generate

# Build your Next.js application
RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Start the application
CMD ["npm", "start"]
