import { useState } from 'react';
import './table.css';

const rows_per_page = 10;
const scores_to_steps = {
  3: 'Field goal',
  6: 'Touchdown',
  7: 'Touchdown, Point-after-touchdown',
};

const map_scores_to_steps = (scores) => {
  return scores.map((score) => scores_to_steps[score]).join(', ');
};


const Table = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const totalPages = (function () {
    const value =
      data.length % rows_per_page === 0
        ? data.length / rows_per_page
        : Math.floor(data.length / rows_per_page) + 1;
    return value;
  })();

  return (
    <table>
      <thead>
        <tr>
          <th>team X</th>
          <th>team Y</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(offset, offset + rows_per_page).map((row, index) => {
          return (
            <tr key={offset+index} >
              <td>{map_scores_to_steps(row.teamX)}</td>
              <td>{map_scores_to_steps(row.teamY)}</td>
            </tr>
          );
        })}
      </tbody>
      <div className='sep-tbody-tfoot'></div>
      <tfoot>
        <tr>
          <td colSpan={2}>
            <button
              disabled={offset === 0}
              onClick={() => {
                setPageNumber((prevPage) => prevPage - 1);
                setOffset((prevouis_offset) => {
                  let offset = prevouis_offset - rows_per_page;
                  if (offset < 0) offset = 0;
                  return offset;
                });
              }}
            >
              Prevouis
            </button>
            <button
              disabled={offset + rows_per_page >= data.length}
              onClick={() => {
                setPageNumber((prevPage) => prevPage + 1);
                setOffset((prevouis_offset) => {
                  let offset = prevouis_offset + rows_per_page;
                  // No need to check if offset+rows_per_page is greater than data.length.
                  // By default .slice() returns only the remaining values !
                  return offset;
                });
              }}
            >
              Next
            </button>
            {pageNumber}/{totalPages} page(s)
          </td>
        </tr>
        <tr>
          <td colSpan={2}>Total rows: {data.length}</td>
        </tr>
      </tfoot>
    </table>
  );
};
export default Table;
