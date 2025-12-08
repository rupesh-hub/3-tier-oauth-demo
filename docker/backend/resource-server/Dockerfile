#Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#Runtime stage
FROM amazoncorretto:17
WORKDIR /app
COPY --from=build /build/target/resource-server-*.jar /app/

ARG APP_VERSION=1.0.0
ARG ACTIVE_PROFILE=default

EXPOSE 8181

ENV JAR_VERSION=${APP_VERSION}
ENV PROFILE=${ACTIVE_PROFILE}

CMD java -jar -Dspring.profiles.active=${PROFILE} resource-server-${JAR_VERSION}.jar