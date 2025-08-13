import {useMemo} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { addMoneyStrings, toNumberCurrencyString } from '../utils/money';
import type { Claim } from '../types/claim';

export default function ClaimTable({ rows }:{rows: Claim[]}) {
  const columns = useMemo<GridColDef[]>(()=>[
    { field: 'id', headerName: 'Claim id', minWidth: 90 },
    { field: 'status', headerName: 'Status', minWidth: 120 },
    { field: 'amount', headerName: 'Claim amount', minWidth: 140,
      valueFormatter: ({ value }) => toNumberCurrencyString(value) },
    { field: 'holder', headerName: 'Holder name', minWidth: 180 },
    { field: 'policyNumber', headerName: 'Policy number', minWidth: 140 },
    { field: 'insuredItem', headerName: 'Insured item', minWidth: 180 },
    { field: 'description', headerName: 'Description', minWidth: 220, flex: 1 },
    { field: 'incidentDate', headerName: 'Incident date', minWidth: 140 },
    { field: 'processingFee', headerName: 'Processing fee', minWidth: 160,
      valueFormatter: ({ value }) => toNumberCurrencyString(value) },
    {
    field: 'total',
    headerName: 'Total amount',
    minWidth: 160,
    valueGetter: (params) => {
        const row = params?.row;
        if (!row) return '';
        return addMoneyStrings(row.amount ?? '0', row.processingFee ?? '0');
    },
    valueFormatter: ({ value }) => toNumberCurrencyString(value ?? '0'),
    },
    { field: 'createdAt', headerName: 'Created at', minWidth: 140 },
  ], []);

  return (
    <Box sx={{ height: 560 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        pageSizeOptions={[rows.length || 10]}
        hideFooterPagination
      />
    </Box>
  );
}
