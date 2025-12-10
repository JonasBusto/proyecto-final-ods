export const getColorBySemaforo = (progreso, semaforos) => {
  if (!semaforos) return '#000000';

  const { min, med, max } = semaforos;

  if (progreso >= 0 && progreso <= min) return '#FF0800';
  if (progreso > min && progreso <= med) return '#FFBF00';
  if (progreso > med && progreso <= max) return '#8DB600';
  if (progreso > max) return '#00458e';

  return '#000000';
};

export const formatDateRequest = (dateString) => {
  if (!dateString) return 'Sin especificar';

  const hasTime = /\d{2}:\d{2}(:\d{2})?/.test(dateString);
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');

  const month = date.toLocaleString('es-AR', { month: 'short' });

  const year = date.getFullYear();

  if (!hasTime) {
    return `${day} ${month} ${year}`;
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
};
