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

async function getMyBoard(userId, success, fail) {
  await local
    .get(`/board/getMyBoard`, { params: { userId } })
    .then(success)
    .catch(fail);
}

async function boardDelete(boardNo, success, fail) {
  await local.delete(`/board/delete/${boardNo}`).then(success).catch(fail);
}

async function searchBoard(searchWord, success, fail) {
  await local
    .get(`/board/search`, { params: { searchWord } })
    .then(success)
    .catch(fail);
}

async function boardStorageContentDeleteByUserId(params, success, fail) {
  await local
    .delete(`/board/boardStorageContentDelete`, { params: params })
    .then(success)
    .catch(fail);
}
export {
  boardDelete,
  boardWrite,
  boardList,
  boardSave,
  getBoardStorage,
  getMyBoard,
  searchBoard,
  boardStorageContentDeleteByUserId,
};
