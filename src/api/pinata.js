import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function pinataUploadImages(param, success, fail) {
  await local.post(`/pinata/upload`, param).then(success).catch(fail);
}

export { pinataUploadImages };
