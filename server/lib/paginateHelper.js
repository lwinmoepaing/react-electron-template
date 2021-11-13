module.exports = ({ page, perPage, totalRows }) => {
  const totalPage = Math.ceil(totalRows / perPage);
  const hasPrevPage = page >= totalPage && page <= 1;
  const hasNextPage = page < totalPage;
  const prevPage = page >= totalPage && page <= 1 ? page - 1 : null;
  const nextPage = page < totalPage ? page + 1 : null;

  return {
    totalPage,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    currentPage: page,
  };
};
