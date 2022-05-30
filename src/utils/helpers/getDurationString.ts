const getDurationString = (totalTime: number): string => {
  if (totalTime <= 0) return 'Не установлена';

  const minutes = totalTime / 1000 / 60;
  const hours = minutes / 60;

  const minutesNum = Math.floor(minutes % 60);
  const hoursNum = Math.floor(hours % 24);
  const daysNum = Math.floor(hours / 24);

  const minutesText = minutesNum ? `${minutesNum} мин` : '';
  const hoursText = hoursNum ? `${hoursNum} ч` : '';
  const daysText = daysNum ? `${daysNum} д` : '';

  return `${daysText} ${hoursText} ${minutesText}`;
};

export default getDurationString;
