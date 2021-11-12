module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    cosmos: {
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
      databaseId: process.env.COSMOS_DATABASE_ID,
      containerId: process.env.COSMOS_CONTAINER_ID,
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
