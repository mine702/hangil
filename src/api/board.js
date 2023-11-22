import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function boardWrite(param, success, fail) {
  await local.post(`/board/write`, param).then(success).catch(fail);
}

async function boardList(params, success, fail) {
  await local.get(`/board/list`, { params: params }).then(success).catch(fail);
}

export { boardWrite, boardList };
