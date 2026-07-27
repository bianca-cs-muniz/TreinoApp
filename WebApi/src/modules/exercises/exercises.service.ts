import { ensureCache, searchCache, getExerciseDetails } from "@libs/freeExerciseDb";

class Service {
  public async search(termPt: string) {
    await ensureCache();
    return searchCache(termPt, 5);
  }

  public async getById(id: string) {
    return await getExerciseDetails(id);
  }
}

export default new Service();
