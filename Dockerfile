# Use an official Node runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilize cache on these particular file layers
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Your app listens on port 3000, expose this port
EXPOSE 3000

# Define the command to run your app
CMD ["node", "dist/main.js"]