<script setup>
import { ref, watch, onMounted } from "vue";

var map;
const positions = ref([]);
const markers = ref([]);
const props = defineProps({ lists: Object });

onMounted(() => {
  console.log(props.lists);
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watch(
  () => props.lists,
  () => {
    const markList = props.lists[1].numberList;
    positions.value = [];

    markList.forEach((list) => {
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(
        list.boardLatitude,
        list.boardLongitude
      );
      obj.title = list.boardPlace;
      positions.value.push(obj);
    });

    if (markList.length > 0) {
      loadMarkers();
    } else {
      deleteAllMarkers();
    }
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(36.358548, 127.3026399),
    level: 5,
  };
  map = new kakao.maps.Map(container, options);

  loadMarkers();
};

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  // if (props.lists[1].length === 0) {
  //   return;
  // }
  // console.log(props.lists[0]);
  // console.log(props.lists[1]);

  deleteAllMarkers();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
  // // 마커를 생성합니다
  markers.value = [];
  const markList = props.lists[1].numberList;

  markList.forEach((list) => {
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(list.boardLatitude, list.boardLongitude);
    obj.title = list.boardPlace;
    positions.value.push(obj);
  });

  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
  });
  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );
  if (markers.value.length === 0) return;
  map.setBounds(bounds);
};

// 모든 마커 삭제
const deleteAllMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  display: flex;
  width: 90%;
  height: 90%;
  left: 5%;
  top: 5%;
  border-radius: 30px;
}
</style>
