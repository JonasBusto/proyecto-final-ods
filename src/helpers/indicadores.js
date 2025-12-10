export const getColorBySemaforo = (progreso, semaforos) => {
  if (!semaforos) return '#000000';

  const { min, med, max } = semaforos;

  if (progreso >= 0 && progreso <= min) return '#FF0800';
  if (progreso > min && progreso <= med) return '#FFBF00';
  if (progreso > med && progreso <= max) return '#8DB600';
  if (progreso > max) return '#00458e';

  return '#000000';
};
