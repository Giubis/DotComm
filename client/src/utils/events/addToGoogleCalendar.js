export function addToGoogleCalendar(event) {
  const start = new Date(event.date);
  const end = new Date(start);
  end.setHours(23, 59, 59);

  const startStr = start.toISOString().replace(/-|:|\.\d+/g, "");
  const endStr = end.toISOString().replace(/-|:|\.\d+/g, "");

  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description || "");
  const location = encodeURIComponent(event.location || "");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startStr}/${endStr}&details=${details}&location=${location}&sf=true&output=xml`;
}
