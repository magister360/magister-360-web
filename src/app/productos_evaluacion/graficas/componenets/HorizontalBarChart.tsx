"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import calculateCalificacionFinal from "@/app/calificacion/CalificacionFinal";

type HorizontalBarChartProps = {
  titleText: string;
  readonly alumnos: Student[] | null;
  readonly participaciones: TypeParticipacionCalificacion[] | null;
  readonly totalParticipaciones: number;
  readonly participacionesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly tareas: TypeTareaCalificacion[] | null;
  readonly totalTareas: number;
  readonly tareasChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly proyectos: TypeProyectoCalificacion[] | null;
  readonly totalProyectos: number;
  readonly proyectosChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly examenes: TypeExamenCalificacion[] | null;

  readonly examenesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly puntosExtra: TypePuntoExtraCalificacion[] | null;

  readonly isCheckedPuntosExtra: boolean;
  readonly isCheckedRedondear?: boolean;
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  titleText,
  alumnos,
  participaciones,
  totalParticipaciones,
  participacionesChecked,
  tareas,
  totalTareas,
  tareasChecked,
  proyectos,
  totalProyectos,
  proyectosChecked,
  examenes,
  examenesChecked,
  puntosExtra,
  isCheckedPuntosExtra,
  isCheckedRedondear,
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
        grid: {
          left: "7%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: getStudentInfo(alumnos),
          axisLabel: {
            fontSize: 12,
            formatter: function (value: string) {
              return value.length > 20 ? value.slice(0, 20) + "..." : value;
            },
          },
          nameGap: 40,
        },
        series: [
          {
            name: "Calificación",
            type: "bar",
            data: getCalificaciones(
              alumnos,
              participaciones,
              totalParticipaciones,
              participacionesChecked,
              tareas,
              totalTareas,
              tareasChecked,
              proyectos,
              totalProyectos,
              proyectosChecked,
              examenes,
              examenesChecked,
              puntosExtra,
              isCheckedPuntosExtra,
              isCheckedRedondear
            ),
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

function getStudentInfo(alumnos: Student[] | null): string[] {
  if (!alumnos) return [];

  return alumnos
    .map((student) => `${student.noLista}.- ${student.nombre}`)
    .reverse();
}

function getCalificaciones(
  alumnos: Student[] | null,
  participaciones: TypeParticipacionCalificacion[] | null,
  totalParticipaciones: number,
  participacionesChecked: {
    isChecked: boolean;
    value: number;
  },
  tareas: TypeTareaCalificacion[] | null,
  totalTareas: number,
  tareasChecked: {
    isChecked: boolean;
    value: number;
  },
  proyectos: TypeProyectoCalificacion[] | null,
  totalProyectos: number,
  proyectosChecked: {
    isChecked: boolean;
    value: number;
  },
  examenes: TypeExamenCalificacion[] | null,

  examenesChecked: {
    isChecked: boolean;
    value: number;
  },
  puntosExtra: TypePuntoExtraCalificacion[] | null,

  isCheckedPuntosExtra: boolean,
  isCheckedRedondear?: boolean
): number[] {
  if (!alumnos) return [];
  const totalExamenes = 1;

  return alumnos
    .map((student) =>
      parseFloat(
        calculateCalificacionFinal({
          noLista: student.noLista,
          proyectos,
          totalProyectos,
          proyectosChecked,
          participaciones,
          totalParticipaciones,
          participacionesChecked,
          tareas,
          totalTareas,
          tareasChecked,
          examenes,
          totalExamenes,
          examenesChecked,
          puntosExtra,
          isCheckedPuntosExtra,
          isCheckedRedondear,
        }).toFixed(0)
      )
    )
    .reverse();
}

export default HorizontalBarChart;
