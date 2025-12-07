1. Build Product Service Image
   docker build -t rupesh1997/authorization-server:1.0.0 -f ../docker/backend/authorization-server/Dockerfile .

2. Run Product Service Container
   docker run -d -p 9000:9000 --name authorization-server --network=usm-network \
   rupesh1997/authorization-server:1.0.0

3. Docker Network Commands
    - List networks
      docker network ls

    - Create network
      docker network create purely-goods-nw --driver bridge

    - Inspect a network
      docker network inspect <network_id_or_name>
      E.g. docker network inspect purely-goods-nw

   