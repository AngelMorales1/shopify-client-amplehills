export default (totalItemsAmount, itemsAmountPerPage, offset, currentPage) => {
  const pageLeftover = totalItemsAmount % itemsAmountPerPage > 0 ? 1 : 0;
  const totalPages =
    Math.floor(totalItemsAmount / itemsAmountPerPage) + pageLeftover;
  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const pageBefore =
    currentPage - offset - 1 >= 0 ? currentPage - offset - 1 : 0;
  const pageAfter =
    currentPage + offset <= totalPages ? currentPage + offset : totalPages;

  return { pagination: pages.slice(pageBefore, pageAfter), totalPages };
};
