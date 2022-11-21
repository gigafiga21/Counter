# Building app in evniroment of original `node` image
FROM node:18 AS build-env
COPY . /app
WORKDIR /app
RUN npm ci --omit=dev

# Copying app to production container without unused apt packages
FROM gcr.io/distroless/nodejs:18
COPY --from=build-env /app /app
WORKDIR /app
CMD ["Source/index.js"]

