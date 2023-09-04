const datas = (state) => state.home.datas;
const hasMore = (state) => state.home.hasMore;
const startIndex = (state) => state.home.startIndex;
const perPage = (state) => state.home.perPage;
const datasPending = (state) => state.home.datasPending;
const loadingMore = (state) => state.home.loadingMore;

export { datas, hasMore, startIndex, perPage, datasPending, loadingMore };
