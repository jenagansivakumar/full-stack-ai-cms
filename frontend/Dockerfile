# Use Node.js 18 image for building the frontend
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with --legacy-peer-deps to resolve dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the application files
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the application with `serve`
CMD ["serve", "-s", "build"]
