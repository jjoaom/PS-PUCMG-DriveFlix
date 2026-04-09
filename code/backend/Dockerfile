# Stage 1 - build
FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build -x test

# Stage 2 - runtime (imagem mínima)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# criar usuário não-root
RUN addgroup -S app && adduser -S app -G app

COPY --from=build /app/build/libs/*.jar app.jar

USER app

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]