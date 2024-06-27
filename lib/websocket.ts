// lib/websocket.ts
export function createWebSocketConnection(
  clientId: string,
  onMessage: (data: any) => void
): WebSocket {
  const ws = new WebSocket(`ws://localhost:3000?client-id=${clientId}`);

  ws.onopen = () => {
    console.log("WebSocket connection opened");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
    console.log(data);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  return ws;
}
