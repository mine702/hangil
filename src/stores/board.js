import { ref } from "vue";
import { defineStore } from "pinia";
import { boardWrite, boardList, boardSave, getBoardStorage } from "@/api/board";
import { httpStatusCode } from "@/util/http-status";

export const useBoardStore = defineStore("boardStore", () => {
  const posts = ref([]); // 게시글 목록을 저장할 배열
  const page = ref(0); // 현재 페이지 번호
  const limit = ref(5); // 한 페이지에 표시할 게시글 수
  const boardStorageContent = ref([]);

  const boardSubmit = async (boardDTO) => {
    await boardWrite(boardDTO, (response) => {
      if (response.status === httpStatusCode.CREATE) {
        console.log("성공");
      } else {
        console.log("실패");
      }
    });
  };

  const fetchPosts = async () => {
    page.value = 1;
    await boardList({ page: page.value, limit: limit.value }, (response) => {
      if (response.status === httpStatusCode.OK) {
        posts.value = response.data.boardList;
      } else {
        console.error("게시글을 불러오는 데 실패했습니다.");
      }
    });
  };

  const fetchMorePosts = async () => {
    // 다음 페이지 게시글 불러오기
    page.value++;
    await boardList({ page: page.value, limit: limit.value }, (response) => {
      if (response.status === httpStatusCode.OK) {
        posts.value = [...posts.value, ...response.data.boardList];
      } else {
        console.error("추가 게시글을 불러오는 데 실패했습니다.");
      }
    });
  };

  const boardSavePost = async (boardStorage) => {
    await boardSave(
      boardStorage,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log("성공");
        } else {
          console.log("실패");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const boardStorage = async (userId) => {
    await getBoardStorage(
      userId,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log("성공");
          boardStorageContent.value = response.data.boardList;
        } else {
          console.log("실패");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return {
    posts,
    page,
    limit,
    boardStorageContent,
    boardSavePost,
    boardSubmit,
    fetchPosts,
    fetchMorePosts,
    boardStorage,
  };
});
