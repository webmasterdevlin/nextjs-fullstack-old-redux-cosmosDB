module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    cosmos: {
      endpoint: "https://nextjs-cosmos.documents.azure.com:443/",
      key: "ZHl0CFmHKfXzz3zezr2BHKY9yxGXwKtYmA1YUp3HJ0y5NNhKHly0V18L1yQY8EkV1BwwOiXfkM7vfAMyznLoRA==",
      databaseId: "mydb",
      containerId: "mycontainer",
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    cosmos: {
      endpoint: "https://nextjs-cosmos.documents.azure.com:443/",
      key: "ZHl0CFmHKfXzz3zezr2BHKY9yxGXwKtYmA1YUp3HJ0y5NNhKHly0V18L1yQY8EkV1BwwOiXfkM7vfAMyznLoRA==",
      databaseId: "mydb",
      containerId: "mycontainer",
    },
  },
};
