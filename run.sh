#!/bin/bash

# Colors for terminal output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

echo -e "${YELLOW}Starting Task Management Application with NestJS + Prisma + React...${NC}"

# Check if Prisma client is generated
echo -e "${BLUE}Checking Prisma setup...${NC}"
cd backend

# Generate Prisma client if needed
if [ ! -d "./node_modules/@prisma/client" ]; then
  echo -e "${YELLOW}Generating Prisma client...${NC}"
  npx prisma generate
  echo -e "${GREEN}Prisma client generated${NC}"
fi

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
npx prisma migrate deploy
echo -e "${GREEN}Database migrations completed${NC}"

# Start backend and frontend in parallel
echo -e "${YELLOW}Starting NestJS backend on http://localhost:5000...${NC}"
npm run start:dev & 
backend_pid=$!

# Wait a moment for backend to initialize
sleep 5

echo -e "${YELLOW}Starting React frontend on http://localhost:5173...${NC}"
cd ../frontend && npm run dev &
frontend_pid=$!

# Function to handle script termination
cleanup() {
  echo -e "\n${YELLOW}Shutting down services...${NC}"
  kill $backend_pid $frontend_pid 2>/dev/null
  echo -e "${GREEN}Services stopped successfully${NC}"
  exit 0
}

# Set up trap to catch termination signal
trap cleanup SIGINT SIGTERM

# Keep script running
echo -e "${GREEN}✅ Application is running!${NC}"
echo -e "${BLUE}📱 Frontend: http://localhost:5173${NC}"
echo -e "${BLUE}🔧 Backend API: http://localhost:5000${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all services.${NC}"
wait