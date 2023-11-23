<script setup>
import { ref, onMounted, watch } from "vue";
import KakaoMap from "@/components/commons/map/KakaoMap.vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/stores/plan";
import { useBoardStore } from "@/stores/board";
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const boardStore = useBoardStore();

const { userInfo } = storeToRefs(memberStore);
const { boardStorageContent } = storeToRefs(boardStore);
const { boardStorage } = boardStore;

const planStore = usePlanStore();
const { addPlan, getPlansStorage, updatePlan } = planStore;
const { pickPlanStorageNo, savedPlanStorage } = storeToRefs(planStore);

// 클릭한 객체의 배열저장
const selectedLists = ref([]);

// mine 추가
onMounted(async () => {
  await boardStorage(userInfo.value.userId);
  await getPlansStorage();

  const allItems = boardStorageContent.value;
  const selectedItems = selectedLists.value;

  console.log(allItems);
  console.log(selectedItems);

  // 선택되지 않은 요소들
  lists.value[0].numberList = allItems.filter(
    (item) => !selectedItems.includes(item.boardNo)
  );

  // 선택된 요소들
  lists.value[1].numberList = allItems.filter((item) =>
    selectedItems.includes(item.boardNo)
  );

  if (index > 0) {
    text.value =
      savedPlanStorage.value[pickPlanStorageNo.value - 1].planStorageName;
  } else {
    text.value = "클릭하여 제목을 편집해주세요";
  }
});

// 클릭한 게시물 인지할때 사용
const route = useRoute();
const { index } = route.params;
// 계획 제목
const text = ref("");
const originalText = ref(""); // 원본 제목을 저장하기 위한 ref
const isEditing = ref(false);
const clickedItem = ref(null); // 클릭된 아이템을 추적하기 위한 ref 생성

const startEditing = () => {
  originalText.value = text.value; // 편집을 시작하기 전에 원본 제목 저장
  isEditing.value = true;
};

const stopEditing = () => {
  // text가 비어있지 않으면 변경사항 저장, 그렇지 않다면 원본 제목으로 복원
  if (text.value.trim() === "") {
    text.value = originalText.value;
  }
  isEditing.value = false;
};

// 계획 단위별 조정
const lists = ref([
  {
    id: 1,
    numberList: [],
  },
  {
    id: 2,
    numberList: [],
  },
]);

// 클릭으로 아이템을 이동시키는 메소드
const moveItem = (clickedItem) => {
  let sourceListIdx, sourceItemIdx, targetListIdx;
  console.log(selectedLists.value);
  // 해당 아이템과 속한 리스트를 찾습니다.
  lists.value.forEach((list, listIdx) => {
    const itemIdx = list.numberList.findIndex((item) => item === clickedItem);
    if (itemIdx !== -1) {
      sourceListIdx = listIdx;
      sourceItemIdx = itemIdx;
      // 반대편 리스트 인덱스를 계산합니다.
      targetListIdx = listIdx === 0 ? 1 : 0;
    }
  });
  // 찾은 아이템을 이동시킵니다.
  if (sourceListIdx !== undefined) {
    const [movedItem] = lists.value[sourceListIdx].numberList.splice(
      sourceItemIdx,
      1
    );
    lists.value[targetListIdx].numberList.push(movedItem);
  }

  // 누른게 왼쪽에 있었을때(계획에 추가할때)
  if (sourceListIdx === 0) {
    selectedLists.value.push(clickedItem);
  }
  // 누른게 오른쪽에 있었을때
  else {
    const indexInSelected = selectedLists.value.indexOf(clickedItem);
    if (indexInSelected !== -1) {
      selectedLists.value.splice(indexInSelected, 1);
    }
  }
};

// 계획에 포함된 게시물들
const savedPlans = ref({
  // pinia로 가져오기
  planStorageNo: pickPlanStorageNo.value,
  userId: userInfo.value.userId,
  planStorageName: savedPlanStorage.value.planStorageName,
  boardNo: [],
});

const router = useRouter();
// plan 저장
const savePlan = async () => {
  try {
    savedPlans.value.planStorageName = text.value;
    console.log("선택된 계획들", selectedLists.value);
    for (var i = 0; i < selectedLists.value.length; i++) {
      savedPlans.value.boardNo.push(selectedLists.value[i].boardNo);
    }
    console.log("vue", savedPlans.value);
    if (index === "0") {
      await addPlan(savedPlans.value);
    } else {
      await updatePlan(savedPlans.value);
    }
    router.push({ name: "myPlans" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="entire-container">
    <div class="top">
      <!-- 계획 제목 -->
      <div class="plan-title">
        <div class="editable-text" v-if="!isEditing" @click="startEditing">
          <div v-if="text === ''">클릭하여 제목을 편집해주세요</div>
          {{ text }}
        </div>
        <input v-else v-model="text" @blur="stopEditing" placeholder="제목 입력" />
      </div>
      <!-- 저장 및 공유 버튼 -->
      <div class="buttons">
        <div class="save-btn effect" @click="savePlan">저장</div>
        <div class="share-btn effect">공유</div>
        <div class="delete-btn effect">삭제</div>
      </div>
    </div>
    <div class="mid">
      <!-- 계획 조정 -->
      <div class="col" v-for="list in lists" :key="list.id">
        <!-- 각 리스트에 대한 컨테이너 -->
        <transition-group :name="`slide-${list.id}`" tag="div">
          <div class="item" v-for="item in list.numberList" :class="{ clicked: clickedItem === item }"
            :key="item.boardPlace" @click="moveItem(item, list.id)">
            {{ item.boardPlace }}
          </div>
        </transition-group>
      </div>
      <div class="map">
        <KakaoMap :lists="lists" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.entire-container {
  height: 100vh;
  width: 100vw;
}

.top {
  height: 15%;
  display: flex;
  align-items: center;
  margin-left: 6.5%;
  justify-content: space-between;
}

.plan-title {
  font-size: 30px;
  width: 480px;
  /* 고정된 너비 */
  height: 70%;
  /* 고정된 높이 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.editable-text {
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.editable-text:hover {
  transform: scale(1.05);
  background-color: #e8e8e8;
}

.input-field {
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 6px;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  align-items: center;
  margin-right: 10%;
}

.save-btn,
.share-btn,
.delete-btn {
  text-align: center;
  display: inline-block;
  /* position: relative; */
  text-decoration: none;
  color: white;
  text-transform: capitalize;
  font-size: 20px;
  padding: 20px 0px;
  width: 150px;
  border-radius: 50px;
  overflow: hidden;
  margin: 2%;
  background: #363c5a;
  transition: all 0.2s linear 0s;
}

.effect:before {
  content: "";
  font-family: FontAwesome;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0px;
  height: 100%;
  width: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0 50% 50% 0;
  transform: scale(0, 1);
  transform-origin: left center;
  transition: all 0.2s linear 0s;
}

.effect:hover {
  text-indent: 30px;
  cursor: pointer;
}

.effect:hover:before {
  transform: scale(1, 1);
  text-indent: 0;
}

.mid {
  display: flex;
  align-items: center;
  height: 80vh;
  margin-left: 6%;
}

.mid .col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  /* 리스트의 너비를 고정 */
  max-width: 100%;
  /* 최대 너비를 100%로 설정 */
  height: 90%;
  background-color: #fff;
  border: 1px solid lightgrey;
  margin: 10px;
  border-radius: 8px;
  padding: 10px;
  overflow-x: hidden;
  /* 가로 스크롤 숨김 */
  overflow-y: auto;
  /* 세로 스크롤 자동 */
}

.mid .col .item {
  /* 리스트 아이템 스타일링 */
  width: 100%;
  /* 너비를 부모의 100%로 조정 */
  margin: 10px 0;
  /* 위아래 마진으로 아이템 간격 조정 */
  padding: 15px 50px;
  /* 내부 여백을 더 크게 조정 */
  background-color: #363c5a;
  color: #fff;
  border-radius: 5px;
  /* 모서리 둥글기 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 */
  cursor: pointer;
  margin-bottom: 10px;
  /* 리스트 항목 간의 간격 */
  transition: all 0.5s ease;
  /* 아이템 이동에 부드러운 전환 효과 추가 */
}

/* 왼쪽 리스트에서 항목이 나갈 때 오른쪽으로 나가는 애니메이션 */
.slide-1-leave-active.item {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-1-leave-to.item {
  transform: translateX(100%);
  opacity: 0;
}

/* 오른쪽 리스트에서 항목이 나갈 때 왼쪽으로 나가는 애니메이션 */
.slide-2-leave-active.item {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-2-leave-to.item {
  transform: translateX(-100%);
  opacity: 0;
}

.map {
  font-size: 100px;
  text-align: center;
  margin-left: 6%;
  width: 50%;
  height: 90%;
  background-color: rgb(92, 103, 141);
  border-radius: 30px;
}
</style>
