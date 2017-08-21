export const pickCell = data => ({
  type: 'PICK_CELL',
  meta: { decker: true },
  data,
});
