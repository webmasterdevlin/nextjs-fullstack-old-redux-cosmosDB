import { Container, CosmosClient } from "@azure/cosmos";
import getConfig from "next/config";

export default async function initializeDbContainers(
  partitionNameKey: string
): Promise<Container> {
  const { endpoint, key, databaseId, containerId } =
    getConfig().serverRuntimeConfig.cosmos;

  const client = new CosmosClient({
    endpoint,
    key,
  });

  let requestedContainer: Container;

  try {
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });

    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: `/PartitionKey_${partitionNameKey}`,
    });

    requestedContainer = container;
  } catch (e) {
    console.log(e);
    requestedContainer = null;
    throw e;
  }

  return requestedContainer;
}
