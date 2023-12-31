import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import {
  userConfirm,
  findById,
  tokenRegeneration,
  logout,
  userJoin,
  userModify,
} from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore(
  "memberStore",
  () => {
    const router = useRouter();

    const isLogin = ref(false);
    const isLoginError = ref(false);
    const userInfo = ref(null);
    const isValidToken = ref(false);

    const userLogin = async (loginUser) => {
      await userConfirm(
        loginUser,
        (response) => {
          if (response.status === httpStatusCode.CREATE) {
            let { data } = response;
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            isLogin.value = true;
            isLoginError.value = false;
            isValidToken.value = true;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
          } else {
            isLogin.value = false;
            isLoginError.value = true;
            isValidToken.value = false;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const userRegist = async (registerUser) => {
      await userJoin(
        registerUser,
        (response) => {
          console.log("회원가입 메서드 호출");
          // 회원가입 성공
          if (response.status === httpStatusCode.ACCEPT) {
            console.log("회원가입 성공!!");
          }
          // 회원가입 실패(중복 체크 등)
          else {
            console.log("회원가입 실패ㅠㅠ");
          }
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

    const tokenRegenerate = async () => {
      await tokenRegeneration(
        JSON.stringify(userInfo.value),
        (response) => {
          if (response.status === httpStatusCode.CREATE) {
            let accessToken = response.data["access-token"];
            sessionStorage.setItem("accessToken", accessToken);
            isValidToken.value = true;
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === httpStatusCode.UNAUTHORIZED) {
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              userInfo.value.userid,
              (response) => {
                if (response.status === httpStatusCode.OK) {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                isLogin.value = false;
                userInfo.value = null;
                isValidToken.value = false;
                router.push({ name: "login" });
              },
              (error) => {
                console.error(error);
                isLogin.value = false;
                userInfo.value = null;
              }
            );
          }
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
      isLogin,
      isLoginError,
      userInfo,
      isValidToken,
      userLogin,
      getUserInfo,
      tokenRegenerate,
      userLogout,
      userRegist,
      userUpdate,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
