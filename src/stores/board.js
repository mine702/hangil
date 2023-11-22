import { defineStore } from "pinia";
import { boardWrite } from "@/api/board";
import { httpStatusCode } from "@/util/http-status";

export const useBoardStore = defineStore("boardStore", () => {
  const boardSubmit = async (boardDTO) => {
    await boardWrite(boardDTO, (response) => {
      if (response.status === httpStatusCode.CREATE) {
        console.log("성공");
      } else {
        console.log("실패");
      }
    });
  };

  return {
    boardSubmit,
  };
});
