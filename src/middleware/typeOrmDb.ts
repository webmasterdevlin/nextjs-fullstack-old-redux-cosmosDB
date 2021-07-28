import "reflect-metadata";
import {
  Connection,
  getConnectionManager,
  getConnectionOptions,
} from "typeorm";

import * as entities from "src/models/api";

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export default async function connectDB(req, res, next) {
  const connectionManager = getConnectionManager();

  if (connectionManager.has("default")) {
    req.db = connectionManager.get();

    req.db.isConnected || (await req.db.connect());

    if (process.env.NODE_ENV !== "production") {
      await updateConnectionEntities(req.db, Object.values(entities));
    }
  } else {
    req.db = await connectionManager
      .create({
        ...(await getConnectionOptions()),
        entities: Object.values(entities),
        migrations: [],
      })
      .connect();
  }

  return next();
}
