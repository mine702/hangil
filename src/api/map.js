import { localAxios, kakaoAxios } from "@/util/http-commons";

const local = localAxios();
const kakao = kakaoAxios();

function listSido(success, fail) {
  local.get(`/map/sido`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
  local.get(`/map/gugun`, { params: param }).then(success).catch(fail);
}

function getSearchList(keyword, success, fail) {
  kakao
    .get(`v2/local/search/keyword.json`, {
      // 수정된 URL
      params: { query: keyword },
    })
    .then(success)
    .catch(fail);
}

export { listSido, listGugun, getSearchList };
