import { createClient } from "redis";

export const redisClient = createClient({
  password: process.env.Redis_Password,
  socket: {
    host: "redis-19567.c258.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 19567,
  },
});

redisClient
  .connect()
  .then(() => console.log("✅ Connected to Redis"))
  .catch(console.error);

export default redisClient;
