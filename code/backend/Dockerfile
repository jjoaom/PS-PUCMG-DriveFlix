# Stage 1 - build
FROM gradle:8.5-jdk17-jammy AS build
WORKDIR /app
COPY . .
RUN gradle shadowJar -x test

# Stage 2 - runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN groupadd -r app && useradd -r -g app app
COPY --from=build /app/build/libs/*-all.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]