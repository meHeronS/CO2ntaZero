# Use Node.js LTS (Hydrogen)
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies based on package.json
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose API Port
EXPOSE 5000

# Start command
CMD ["npm", "run", "start:backend"]
