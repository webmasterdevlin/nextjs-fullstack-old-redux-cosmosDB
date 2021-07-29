import { IVillainModel } from "src/models/villainModel";
import initializeDbContainers from "src/utils/cosmosDbConnect";

const partitionNameKey = "Villains";

export const villainFind = async (): Promise<IVillainModel[]> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resources } = await container.items
      .readAll<IVillainModel>()
      .fetchAll();

    return resources;
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    await container.item(id).delete();
  } catch (e) {
    throw e;
  }
};

export const villainSave = async (
  body: IVillainModel
): Promise<IVillainModel> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resource } = await container.items.create<IVillainModel>(body);

    return resource;
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndUpdate = async (
  id: string,
  body: IVillainModel
): Promise<void> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    await container.item(id).replace(body);
  } catch (e) {
    throw e;
  }
};

export const villainFindById = async (id: string): Promise<IVillainModel> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resource } = await container.item(id).read<IVillainModel>();

    return resource;
  } catch (e) {
    throw e;
  }
};
