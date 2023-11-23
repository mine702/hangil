import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function showPlan(planStorageNo, success, fail) {
  await local.get(`/plan/${planStorageNo}`).then(success).catch(fail);
}

// param : List<Integr>boardNo
async function registPlan(param, success, fail) {
  await local.post(`/plan`, param).then(success).catch(fail);
}

async function modifyPlan(param, success, fail) {
  await local.put(`/plan`, param).then(success).catch(fail);
}

async function planStorageList(success, fail) {
  await local.get(`/plan/list`).then(success).catch(fail);
}

export { showPlan, registPlan, modifyPlan, planStorageList };
