import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function boardWrite(param, success, fail) {
  await local.post(`/board/write`, param).then(success).catch(fail);
}

async function boardList(params, success, fail) {
  await local.get(`/board/list`, { params: params }).then(success).catch(fail);
}
async function boardSave(params, success, fail) {
  await local.get(`/board/save`, { params: params }).then(success).catch(fail);
}

async function getBoardStorage(userId, success, fail) {
  await local
    .get(`/board/getBoardStorage`, { params: { userId } })
    .then(success)
    .catch(fail);
}

export { boardWrite, boardList, boardSave, getBoardStorage };
