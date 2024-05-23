#!/bin/sh

# Apply database migrations
npm run db:migrate

# Run the application
exec "$@"
