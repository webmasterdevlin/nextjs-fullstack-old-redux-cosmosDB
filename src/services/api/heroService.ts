import boom from "@hapi/boom";
import { getRepository } from "typeorm";

import { HeroEntity } from "src/models/api/heroEntity";

export const heroFind = async (): Promise<HeroEntity[]> => {
  try {
    let db = getRepository(HeroEntity);
    return await db.find();
  } catch (e) {
    throw boom.boomify(e);
  }
};

export const heroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    let db = getRepository(HeroEntity);
    await db.delete({ id });
  } catch (e) {
    throw boom.boomify(e);
  }
};

export const heroSave = async (body: HeroEntity): Promise<HeroEntity> => {
  try {
    let db = getRepository(HeroEntity);
    return await db.save(body);
  } catch (e) {
    console.log(e);
    throw boom.boomify(e);
  }
};

export const heroFindByIdAndUpdate = async (
  id: string,
  body: HeroEntity
): Promise<void> => {
  try {
    let db = getRepository(HeroEntity);
    const heroToUpdate: HeroEntity = await db.findOne({
      id,
    });
    let updated: HeroEntity = Object.assign(heroToUpdate, body);
    // based on TypeORM's docs use db.save instead of db.update
    await db.save(updated);
  } catch (e) {
    boom.boomify(e);
  }
};

export const heroFindById = async (id: string): Promise<HeroEntity> => {
  try {
    let db = getRepository(HeroEntity);
    return await db.findOne({ id });
  } catch (e) {
    boom.boomify(e);
  }
};
