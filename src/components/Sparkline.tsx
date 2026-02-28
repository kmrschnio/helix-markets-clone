"use client";

import { useRef, useEffect } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export default function Sparkline({
  data,
  width = 100,
  height = 40,
  color,
  className = "",
}: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lineColor =
    color || (data[data.length - 1] >= data[0] ? "#0ee29b" : "#f3164d");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;

    const stepX = (width - padding * 2) / (data.length - 1);

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    data.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = padding + (1 - (val - min) / range) * (height - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, lineColor + "30");
    gradient.addColorStop(1, lineColor + "00");

    ctx.lineTo(padding + (data.length - 1) * stepX, height);
    ctx.lineTo(padding, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, width, height, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ width, height }}
    />
  );
}
