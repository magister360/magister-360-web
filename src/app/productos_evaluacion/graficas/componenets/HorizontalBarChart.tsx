"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface HorizontalBarChartProps {
  titleText: string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  titleText,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const newChart = echarts.init(chartRef.current);

      const option = {
        title: {
          text: titleText,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: [
            "Manuel Lopez ",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Jose Lopez",
            "Martiz Perz",
            "Manuel Lopez ",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Jose Lopez",
            "Martiz Perz",
            "Manuel Lopez ",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Jose Lopez",
            "Martiz Perz",
            "Jueves",
            "Viernes",
            "Jose Lopez",
            "Martiz Perz",
            "Manuel Lopez ",
            "Martes",
            "Miércoles",
            "Jueves",
          ],
        },
        series: [
          {
            name: "Ventas",
            type: "bar",
            data: [
              10, 9, 8, 9, 6, 10, 8, 10, 9, 8, 9, 6, 10, 8, 10, 9, 8, 9, 6, 10,
              8, 10, 8, 10, 9, 8, 9, 6, 10,
            ],
            label: {
              show: true,
              position: "right",
            },
          },
        ],
      };

      newChart.setOption(option);
      setChart(newChart);

      return () => {
        newChart.dispose();
      };
    }
  }, [titleText]);

  const handleDownloadPNG = () => {
    if (chart) {
      const url = chart.getDataURL({
        type: "png",
        pixelRatio: 2,
        backgroundColor: "#fff",
      });
      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="w-full h-[215vh]">
      <div ref={chartRef} className="w-full h-[200vh]"></div>
      <div className="mt-4 space-x-2">
        <button
          onClick={handleDownloadPNG}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Descargar gráfica imagen .png
        </button>
      
      </div>
    </div>
  );
};

export default HorizontalBarChart;
