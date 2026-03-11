import { useEffect, useRef, useState } from "react";

export function useWebSocket(url) {
  const ws = useRef(null);
  const reconnectAttempts = useRef(0);
  const timeoutRef = useRef(null);

  const [status, setStatus] = useState("connecting");
  const [data, setData] = useState(null);

  const connect = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setStatus("open");
      reconnectAttempts.current = 0;
    };

    ws.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    ws.current.onerror = () => {
      setStatus("error");
    };

    ws.current.onclose = () => {
      setStatus("closed");
      reconnect();
    };
  };

  const reconnect = () => {
    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttempts.current),
      30000,
    );

    reconnectAttempts.current++;

    timeoutRef.current = setTimeout(connect, delay);
  };

  useEffect(() => {
    connect();

    return () => {
      clearTimeout(timeoutRef.current);
      ws.current?.close();
    };
  }, [url]);

  return { data, status };
}
