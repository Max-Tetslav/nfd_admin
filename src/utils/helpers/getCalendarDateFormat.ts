const getCalendarDateFormat = (date?: number) => {
  let actualDate;

  if (date) {
    actualDate = new Date(date);
  } else {
    actualDate = new Date();
  }

  const formatedDate = actualDate
    .toLocaleDateString()
    .split('.')
    .reverse()
    .join('-');
  const formatedTime = actualDate
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':');

  return `${formatedDate}T${formatedTime}`;
};

export default getCalendarDateFormat;
