import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import {
  showPlan,
  registPlan,
  planStorageList,
  modifyPlan,
  getPlanList,
  deletePlanStorage,
} from "@/api/plan";
import { httpStatusCode } from "@/util/http-status";

export const usePlanStore = defineStore(
  "planStore",
  () => {
    const router = useRouter();
    // 선택한 보관함 넘버 저장
    const pickPlanStorageNo = ref(null);
    // 저장되어있는 보관함 배열
    const savedPlanStorage = ref([]);
    // 해당 보관함에 저장되어있는 계획들
    const savedPlanList = ref([]);

    const getPlansStorage = async () => {
      await planStorageList(
        (response) => {
          if (response.status === httpStatusCode.OK) {
            savedPlanStorage.value = response.data.planStorageList;
          } else {
            console.error("안찍혀");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const getPlans = async (planStorageNo) => {
      await getPlanList(
        planStorageNo,
        (response) => {
          console.log("백에서 받은거", response.data);
          savedPlanList.value = response.data;
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const detailPlan = async (planStorageNo) => {
      await showPlan(
        planStorageNo,
        (response) => {
          router.push({ name: "planPage", params: { index: planStorageNo } });
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const addPlan = async (planInfo) => {
      console.log("저장 메서드 호출", planInfo[0]);
      await registPlan(
        {
          planStorageNo: planInfo.planStorageNo,
          userId: planInfo.userId,
          planStorageName: planInfo.planStorageName,
          planStorageContents: planInfo.boardNo,
        },
        (response) => {
          // savedPlanStorage.push(planStorageName);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const updatePlan = async (planInfo) => {
      console.log("업데이트 메서드 호출", planInfo);
      await modifyPlan(
        {
          planStorageNo: planInfo.planStorageNo,
          userId: planInfo.userId,
          planStorageName: planInfo.planStorageName,
          planStorageContents: planInfo.boardNo,
        },
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const deleteStorage = async (storageNo) => {
      console.log("삭제 메서드 호출", storageNo);
      await deletePlanStorage(
        storageNo,
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    return {
      detailPlan,
      addPlan,
      pickPlanStorageNo,
      savedPlanStorage,
      updatePlan,
      getPlansStorage,
      getPlans,
      savedPlanList,
      deleteStorage,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
