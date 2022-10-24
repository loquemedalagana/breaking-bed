import React from 'react';
import styled from '@emotion/styled';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { DEVICE_MOBILE_WIDTH } from 'src/device/devices';

const TableBox = styled(MuiTable)`
  align-self: center;
  @media screen and (min-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    width: 100%;
  }
`;

interface TableProps {
  id: number;
  col: number;
  row: number;
  size?: 'small' | 'medium';
  items: string[][];
}

const Table: React.FC<TableProps> = ({ id, size = 'small', col, row, items }) => {
  const getTextAlign = (colIndex: number): TableCellProps['align'] => {
    if (colIndex === 0) return 'left';
    if (colIndex === col - 1) return 'right';
    return 'center';
  };

  return (
    <TableBox size={size}>
      <TableBody>
        {items.map((rowItems, rowIndex) => (
          <TableRow key={`table-row-${rowIndex}-for-item${id}-${row}X${col}`}>
            {rowItems.map((item, colIndex) => (
              <TableCell
                align={getTextAlign(colIndex)}
                key={`table-col-${colIndex}-for-item${id}-${row}X${col}-${rowIndex}`}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableBox>
  );
};

export default Table;
