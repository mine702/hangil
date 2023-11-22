import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function showPlan(planStorageNo, success, fail) {
  await local.get(`/plan/${planStorageNo}`).then(success).catch(fail);
}

async function registPlan(success, fail) {
  await local.post(`/plan`).then(success).catch(fail);
}

export { showPlan, registPlan };
