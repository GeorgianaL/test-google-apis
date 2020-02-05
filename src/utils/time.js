export const firstDayOfMonth = date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDayOfMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);
