<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { usePinataStore } from "@/stores/pinata";
import { useMemberStore } from "@/stores/member";
import { useBoardStore } from "@/stores/board";
import { useRouter } from "vue-router";
import { getSearchList } from "@/api/map";

const pinataStore = usePinataStore();
const memberStore = useMemberStore();
const boardStore = useBoardStore();

const { imgCid } = storeToRefs(pinataStore);
const { userInfo } = storeToRefs(memberStore);
const { submitImages } = pinataStore;
const { boardSubmit } = boardStore;

const boardPlaces = ref("");
const boardFiles = ref([]);
const imageUrls = ref([]);
const placeList = ref([]);
const selectedPlace = ref(null); // 하나의 선택된 장소를 저장할 ref
const boardImgFiles = ref([]); // 원본 이미지

const currentSlide = ref(0);
const fading = ref(false);

const boardTag = ref("");

const isLoading = ref(false); // 로딩 상태 표시
const isCompleted = ref(false); // 완료 상태
const router = useRouter(); // 페이지 리디렉션을 위한 라우터 인스턴스

const boardDTO = ref({
  userId: userInfo.value.userId,
  boardTitle: "",
  boardContent: "",
  boardFileCid: [],
  boardPlace: "",
  boardLatitude: "",
  boardLongitude: "",
  hashTagContent: [],
});

const addTag = () => {
  // 입력된 태그가 있다면 배열에 추가
  if (boardTag.value.trim()) {
    boardDTO.value.hashTagContent.push(boardTag.value.trim());
    boardTag.value = ""; // 입력 필드 초기화
  }
};

const removeTag = (index) => {
  boardDTO.value.hashTagContent.splice(index, 1); // 배열에서 해당 인덱스의 태그를 제거
};

// 스페이스바를 눌렀을 때 addTag 함수를 호출
const handleSpace = (event) => {
  event.preventDefault(); // 기본 동작 방지
  addTag();
};

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 캔버스의 크기를 700x900으로 설정
      canvas.width = 700;
      canvas.height = 400;

      // 이미지를 캔버스에 700x900 크기로 강제로 그림
      ctx.drawImage(image, 0, 0, 700, 400);

      canvas.toBlob((blob) => {
        resolve(
          new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          })
        );
      }, "image/jpeg");
    };

    image.onerror = () => {
      reject(new Error("Image load error"));
    };
  });
};

const handleFileChange = async (event) => {
  const files = Array.from(event.target.files);
  try {
    const resizedImages = await Promise.all(
      files.map((file) => resizeImage(file))
    );

    // 여기서 resizedImages는 700x900 크기로 조정된 이미지 파일의 배열입니다.
    boardFiles.value = resizedImages;
    imageUrls.value = resizedImages.map((file) => URL.createObjectURL(file));
    boardImgFiles.value = resizedImages;
  } catch (error) {
    console.error(error);
  }
};

const nextSlide = () => {
  if (currentSlide.value < imageUrls.value.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = imageUrls.value.length - 1;
  }
};

const submitImage = async () => {
  isLoading.value = true; // 로딩 시작
  const formData = new FormData();
  for (let i = 0; i < boardFiles.value.length; i++) {
    formData.append("imageFile", boardFiles.value[i]);
  }
  try {
    await submitImages(formData);
    boardDTO.value.boardFileCid = imgCid.value;

    await boardSubmit(boardDTO.value);

    isCompleted.value = true; // 완료 상태로 설정
    setTimeout(() => {
      router.push("/home"); // 사용자를 다른 페이지로 리디렉션
    }, 1000); // 3초 후 페이지 이동
  } catch (error) {
    console.error(error);
    // 에러 처리 로직
  } finally {
    isLoading.value = false; // 로딩 상태 해제
  }
};

// 카카오맵 api
const searchPlaces = async () => {
  if (!boardPlaces.value.trim()) return;

  try {
    // API 호출 시 검색어를 파라미터로 넘겨줍니다.
    await getSearchList(
      boardPlaces.value,
      (response) => {
        placeList.value = response.data.documents;
      },
      (error) => {
        console.error("장소 검색 오류:", error);
      }
    );
  } catch (error) {
    console.error("장소 검색 오류:", error);
  }
};

const selectPlace = (place) => {
  selectedPlace.value = place; // 선택된 장소 업데이트
  boardDTO.value.boardLatitude = place.y;
  boardDTO.value.boardLongitude = place.x;
  boardDTO.value.boardPlace = place.place_name;
};
</script>

<template>
  <body>
    <div class="page-container">
      <div class="card">
        <input type="text" placeholder="제목" v-model="boardDTO.boardTitle" />

        <!-- 카카오맵 api -->
        <input
          type="text"
          placeholder="장소 검색"
          v-model="boardPlaces"
          @input="searchPlaces"
        />
        <div class="list-container">
          <ul v-if="placeList.length" class="place-list">
            <li v-for="(place, index) in placeList" :key="index">
              <a href="#" @click.prevent="selectPlace(place)">
                {{ place.place_name }}
                <span
                  v-if="selectedPlace && place.id === selectedPlace.id"
                  class="checkmark"
                  >✔</span
                >
              </a>
            </li>
          </ul>
        </div>
        <!-- 카카오맵 api -->
        <textarea placeholder="내용" v-model="boardDTO.boardContent"></textarea>
        <input
          type="file"
          multiple
          accept=".png, .jpg, .jpeg"
          @change="handleFileChange"
        />

        <div v-if="imageUrls.length" class="slider">
          <button class="slide-btn left" @click="previousSlide">
            &#10094;
          </button>
          <img
            :src="imageUrls[currentSlide]"
            class="slide-image"
            :class="{ fading: fading }"
          />
          <button class="slide-btn right" @click="nextSlide">&#10095;</button>
        </div>
        <!-- 태그 입력 필드 -->
        <input
          type="text"
          placeholder="태그"
          v-model="boardTag"
          @keydown.space="handleSpace"
        />

        <!-- 입력된 태그들을 리스트로 표시 -->
        <transition-group name="tag" class="tags-container" tag="div">
          <span
            class="tag"
            v-for="(tag, index) in boardDTO.hashTagContent"
            :key="tag"
          >
            {{ tag }}
            <button class="delete-tag" @click="removeTag(index)">x</button>
          </span>
        </transition-group>
        <!-- 버튼에 완료 상태에 따라 다른 클래스 적용 -->
        <button
          @click="submitImage"
          :class="{
            'loading-button': isLoading,
            'completed-button': isCompleted,
            submitButton: !isLoading && !isCompleted,
          }"
        >
          <span v-if="isLoading" class="loading-spinner">
            <div class="spinner"></div>
          </span>
          <span v-else-if="isCompleted">Completed</span>
          <span v-else>Submit</span>
        </button>
      </div>
    </div>
  </body>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  /* 화면의 전체 높이 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* 상단에 고정 */
  padding-top: 1%;
  /* 상단에 공간을 주기 위한 패딩 */
  padding-bottom: 1%;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 화면 중앙에 카드 위치 */
.card {
  max-width: 50vh;
  /* 뷰포트 높이의 50%만큼 최대 너비 설정 */
  padding: 2rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  background-color: #ffffff;
  margin: 5% auto 0;
  /* 상단에 마진을 주고 가운데 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

/* 입력 필드 스타일 */
input[type="text"],
input[type="file"],
textarea {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
}

/* 텍스트 영역 높이 확장 */
textarea {
  height: 150px;
  resize: none;
}

/* 감성적인 디자인의 제출 버튼 */
button {
  padding: 0.5rem 1rem;
  background-color: #f2c14e;
  border: none;
  border-radius: 0.5rem;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f7b731;
}

/* 파일 선택 버튼 디자인 */
.input[type="file"] {
  border: none;
  color: white;
  background-color: #7bed9f;
  text-align: center;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.input[type="file"]:hover {
  background-color: #2ed573;
}

/* 태그 컨테이너 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

/* 태그 디자인 */
.tag {
  background-color: #ff7f50;
  color: black;
  padding: 5px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #efefef;
  border-radius: 16px;
}

/* 태그 삭제 버튼 디자인 */
.delete-tag {
  margin-left: 5px;
  cursor: pointer;
  background: none;
  border: none;
}

.delete-tag:hover {
  background-color: #28a745;
}

/* 태그의 등장과 사라짐에 대한 애니메이션 효과 */
.tag-enter-active,
.tag-leave-active {
  transition: all 0.3s ease;
}

.tag-enter,
.tag-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-btn.left {
  left: 10px;
}

.slide-btn.right {
  right: 10px;
}

.submitButton {
  margin-top: 5%;
}

/* 슬라이더 스타일 */
.slider {
  position: relative;
  width: 100%;
  /* 슬라이더의 너비를 줄임 */
  margin: 20px auto;
}

/* 이미지 슬라이더 스타일 */
.slide-image {
  width: 100%;
  height: auto;
  /* 이미지의 높이를 자동으로 조정하여 비율을 유지 */
  object-fit: cover;
  transition: opacity 0.5s ease;
}

/* 버튼 스타일 */
.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  /* 버튼 내 아이콘의 크기를 늘림 */
  display: flex;
  /* flex 컨테이너로 만듦 */
  align-items: center;
  /* 수직 중앙 정렬 */
  justify-content: center;
  /* 수평 중앙 정렬 */
  text-align: center;
  /* 텍스트 중앙 정렬 */
  padding-top: 3%;
  padding-bottom: 1%;
}

/* 로딩 스피너 스타일 */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #f2c14e;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 로딩 스피너 스타일 */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 로딩 중인 버튼 스타일 */
.loading-button {
  background-color: red;
  /* 로딩 중 빨간색 배경 */
  color: white;
  /* 텍스트 색상 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;

  /* 나머지 스타일은 동일 */
}

/* 완료 버튼 스타일 */
.completed-button {
  background-color: green;
  /* 완료 상태에서 초록색 배경 */
  color: white;
  /* 텍스트 색상 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  /* 나머지 스타일은 동일 */
}

.list-container {
  max-height: 200px;
  /* 최대 높이 설정 */
  overflow-y: auto;
  /* 내용이 넘칠 경우 스크롤바 표시 */
}

.place-list {
  list-style: none;
  /* 기본 리스트 스타일 제거 */
  padding: 0;
  /* 기본 패딩 제거 */
}

.place-list a {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: black;
  transition: background-color 0.3s, color 0.3s;
}

.place-list a:hover {
  background-color: #f2f2f2;
  color: #333;
}

.checkmark {
  color: green;
  margin-left: 5px;
}

/* 체크 표시의 디자인 */
.checkmark {
  color: #28a745;
  /* 부트스트랩의 success 색상 */
  font-weight: bold;
}

/* 호버 애니메이션을 위한 스타일 */
.place-list a:hover .checkmark {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}
</style>
