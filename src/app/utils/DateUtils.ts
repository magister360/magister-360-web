export const DateFormats = {
  SHORT: "dd-mm-yyyy",
  US: "mm-dd-yyyy",
  ISO: "yyyy-mm-dd",
} as const;

export type DateFormat = (typeof DateFormats)[keyof typeof DateFormats];

export function formatDate(
  date: Date | null,
  format: DateFormat = DateFormats.SHORT
): string {
  if (date === null) {
    return "";
  }
  try {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    switch (format) {
      case DateFormats.SHORT:
        return `${day}-${month}-${year}`;
      case DateFormats.US:
        return `${month}-${day}-${year}`;
      case DateFormats.ISO:
        return `${year}-${month}-${day}`;
      default:
        return "";
    }
  } catch (error) {
    return "";
  }
}

export function formatDateLocale(
  dateString: string,
  locale: string = "es-ES"
): string {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return ""
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const formattedParts = parts.map((part) =>
    part.type === "month" ? part.value.toLowerCase() : part.value
  );

  return formattedParts.join("");
}

export function convertDateToISO(dateString: string): string {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

export function formatDateStr(
  dateString: string,
  format: DateFormat = DateFormats.SHORT
): string {
  try {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    switch (format) {
      case DateFormats.SHORT:
        return `${day}-${month}-${year}`;
      case DateFormats.US:
        return `${month}-${day}-${year}`;
      case DateFormats.ISO:
        return `${year}-${month}-${day}`;
      default:
        return "";
    }
  } catch (error) {
    return "";
  }
}

export function formatDateLong(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  const [day, month, year] = formattedDate.split(' de ');
  
  return `${parseInt(day)} de ${month} del ${year}`;
}
