import { ref } from "vue";
import { defineStore } from "pinia";

import { pinataUploadImages } from "@/api/pinata.js";
import { httpStatusCode } from "@/util/http-status";

export const usePinataStore = defineStore("pinatastore", () => {
  const imgCid = ref([]);

  const submitImages = async (images) => {
    await pinataUploadImages(
      images,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          imgCid.value = response.data.CID;
        } else {
          console.log(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return {
    submitImages,
    imgCid,
  };
});
