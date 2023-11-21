import { defineStore } from "pinia";

import { pinataUploadImages } from "@/api/pinata.js";
import { httpStatusCode } from "@/util/http-status";

export const usePinataStore = defineStore("pinatastore", () => {
  const submitImages = async (images) => {
    console.log(images);
    await pinataUploadImages(
      images,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          console.log(response);
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
  };
});
