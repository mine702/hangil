export class ChatService {
  constructor() {
    this.socket = new WebSocket("ws://localhost:80/chat");
  }

  connect() {
    this.socket.onopen = function (event) {
      console.log("Connected to WebSocket");
    };

    this.socket.onmessage = function (event) {
      let message = JSON.parse(event.data);
      // 메시지 처리 로직
    };

    this.socket.onerror = function (event) {
      console.error("WebSocket error:", event);
    };
  }

  sendMessage(message) {
    this.socket.send(JSON.stringify(message));
  }
}
