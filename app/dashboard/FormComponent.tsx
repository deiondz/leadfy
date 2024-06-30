"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket";

export default function FormComponent() {
  const [progress, setProgress] = React.useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // You can use this data to make API calls or other logic

    const socket = getSocket();
    socket.connect();
    function onConnect() {
      console.log("Connected to socket");
      setDisabled(true);
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", (data: any) => {
      console.error(`Error: ${data.error}`);
    });

    socket.on("progress", (data: any) => {
      setProgress(data);
      console.log(`Progress: ${data}`);
    });

    socket.on("file", (data: any) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "results.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      socket.disconnect();
      setProgress(0);
      setIsConnected(false);
      setDisabled(false);
      setTransport("N/A");
    });

    socket.emit("scrape", data);
  };
  return (
    <>
      <form
        className="flex h-full max-w-lg flex-col items-center justify-between gap-3"
        onSubmit={handleSubmit}
      >
        {/* <div className="w-full">
          <p>Status: {isConnected ? "connected" : "disconnected"}</p>
          <p>Transport: {transport}</p>
        </div> */}
        <h1 className="py-5 md:text-5xl text-4xl text-center font-bold">
          Find leads using Google Maps
        </h1>

        <Input
          size={50}
          disabled={disabled}
          type="text"
          name="location"
          className="h-14"
          placeholder="Enter google maps coordinates, eg. 40.7128, -74.0060"
        />
        <Input
          size={50}
          disabled={disabled}
          type="text"
          name="coordinates"
          className="h-14"
          placeholder="Enter keywords, separated by commas"
        />

        <Button disabled={disabled} size="lg" className=" h-14 w-full">
          Find leads
        </Button>
        {progress > 0 && (
          <div className="w-full space-y-2 py-4">
            <p>Progress</p>
            <Progress value={progress} className="w-full h-8" />
          </div>
        )}
      </form>
    </>
  );
}
