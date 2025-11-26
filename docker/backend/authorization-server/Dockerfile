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
COPY --from=build /build/target/authorization-server-*.jar /app/

ARG APP_VERSION=1.0.0
ARG PROFILE=default

EXPOSE 9000

ENV JAR_VERSION=${APP_VERSION}
ENV ACTIVE_PROFILE=${PROFILE}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} authorization-server-${JAR_VERSION}.jar