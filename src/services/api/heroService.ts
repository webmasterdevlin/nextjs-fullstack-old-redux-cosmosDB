import { IHeroModel } from "src/models/client/heroModel";
import initializeDbContainers from "src/utils/cosmosDbConnect";

const partitionNameKey = "Heroes";

export const heroFind = async (): Promise<IHeroModel[]> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resources } = await container.items
      .readAll<IHeroModel>()
      .fetchAll();

    return resources;
  } catch (e) {
    throw e;
  }
};

export const heroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    await container.item(id).delete();
  } catch (e) {
    throw e;
  }
};

export const heroSave = async (body: IHeroModel): Promise<IHeroModel> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resource } = await container.items.create<IHeroModel>(body);

    return resource;
  } catch (e) {
    throw e;
  }
};

export const heroFindByIdAndUpdate = async (
  id: string,
  body: IHeroModel
): Promise<void> => {
  try {
    console.log(JSON.stringify(id, null, 2));
    console.log(JSON.stringify(body, null, 2));
    const container = await initializeDbContainers(partitionNameKey);
    await container.item(id, partitionNameKey).replace(body);
  } catch (e) {
    throw e;
  }
};

export const heroFindById = async (id: string): Promise<IHeroModel> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resource } = await container.item(id).read<IHeroModel>();

    return resource;
  } catch (e) {
    throw e;
  }
};
