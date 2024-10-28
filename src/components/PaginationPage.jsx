import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import styles from "./PaginationPage.module.css";

function PaginationPage({ page, totalPage, setPage, refetch }) {

  const directPageHandler = (pageNum) => {
    setPage(pageNum);
    refetch();
  };

  const prevHandler = () => {
    setPage(prev => prev > 1 ? prev - 1 : prev);
    refetch();
  }
  const nextHandler = () => {
    setPage(prev => prev < totalPage ? prev + 1 : prev);
    refetch();
  }

  return (
    <div className={styles.container}>
      <button onClick={prevHandler} disabled={page == 1}>
        <IoIosArrowBack className={styles.icon} />
      </button>
      {page - 2 >= 1 && (
        <p className={``} onClick={() => directPageHandler(page - 2)}>
          {page - 2}
        </p>
      )}
      {page - 1 >= 1 && (
        <p className={``} onClick={() => directPageHandler(page - 1)}>
          {page - 1}
        </p>
      )}
      <p className={styles.selected} onClick={() => directPageHandler(page)}>
        {page}
      </p>
      {page + 1 <= totalPage && (
        <p className={``} onClick={() => directPageHandler(page + 1)}>
          {page + 1}
        </p>
      )}
      {page + 2 <= totalPage && (
        <p className={``} onClick={() => directPageHandler(page + 2)}>
          {page + 2}
        </p>
      )}
      <button onClick={nextHandler} disabled={page == totalPage}>
        <IoIosArrowForward className={styles.icon} />
      </button>
    </div>
  );
}

export default PaginationPage;
