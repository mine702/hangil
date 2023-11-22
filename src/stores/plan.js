import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { showPlan, registPlan } from "@/api/plan";
import { httpStatusCode } from "@/util/http-status";

export const usePlanStore = defineStore(
  "planStore",
  () => {
    const router = useRouter();
    const planInfo = ref(null);
    const pickPlanNo = ref(null);

    const detailPlan = async (planStorageNo) => {
      await showPlan(
        planStorageNo,
        (response) => {
          console.log(response.data);
          // pickPlanNo.value = response.data.planStorageNo;
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const addPlan = async () => {
      await registPlan(
        (response) => {
          console.log("저장 메서드 호출");
          console.log(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const userUpdate = async (updateUser) => {
      await userModify(
        updateUser,
        (response) => {
          console.log("유저 정보 업데이트 메서드 호출");
          // 정보수정 성공
          if (response.status === httpStatusCode.OK) {
            userInfo.value = response.data.userInfo;
            console.log("정보수정 성공!!");
          }
          // 정보수정 실패
          else {
            console.log("정보수정 실패ㅠㅠ");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const getUserInfo = (token) => {
      let decodeToken = jwtDecode(token);
      findById(
        decodeToken.userId,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            userInfo.value = response.data.userInfo;
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.error(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          isValidToken.value = false;
          await tokenRegenerate();
        }
      );
    };

    const userLogout = async (userid) => {
      await logout(
        userid,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;
            sessionStorage.clear();
          } else {
            console.error("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    };

    return {
      detailPlan,
      addPlan,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
