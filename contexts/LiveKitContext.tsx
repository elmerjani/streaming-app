'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { Room, RoomEvent, ConnectionState } from 'livekit-client';

type LiveKitContextType = {
  room: Room | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectToRoom: (token: string) => Promise<void>;
  disconnectFromRoom: () => void;
};

const LiveKitContext = createContext<LiveKitContextType>({
  room: null,
  isConnected: false,
  isConnecting: false,
  connectToRoom: async () => {},
  disconnectFromRoom: () => {},
});

export const useLiveKit = () => useContext(LiveKitContext);

export const LiveKitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [room] = useState(() => new Room());
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handleConnectionStateChanged = (state: ConnectionState) => {
      setIsConnected(state === ConnectionState.Connected);
      setIsConnecting(state === ConnectionState.Connecting);
    };

    room.on(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged);

    return () => {
      room.off(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged);
    };
  }, [room]);

  const connectToRoom = async (token: string) => {
    try {
      setIsConnecting(true);
      await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, token);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to LiveKit room:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectFromRoom = () => {
    room.disconnect();
    setIsConnected(false);
  };

  return (
    <LiveKitContext.Provider
      value={{
        room,
        isConnected,
        isConnecting,
        connectToRoom,
        disconnectFromRoom,
      }}
    >
      {children}
    </LiveKitContext.Provider>
  );
};
