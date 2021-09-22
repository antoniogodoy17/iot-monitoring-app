### STAGE 1: Build Angular App ###

# Use official node image as the base image
FROM node:latest as node

# Set the working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Install all the dependencies
RUN npm install

COPY . .

# Generate the build of the application
RUN npm run build -- --configuration=production
# --base-href /app --deploy-url /app/

### STAGE 2: Setup NGINX ###

# Use official nginx image as the base image
FROM nginx:latest as nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=node /app/dist/iot-monitoring-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80
