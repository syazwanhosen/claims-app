import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { ClaimStatus } from '../types/claim';
import { type SortKey } from '../utils/sorting';

const statuses: ClaimStatus[] = ['Submitted','Approved','Processed','Completed','Rejected'];

export default function SearchFilterBar(props: {
  search: string; setSearch: (v: string) => void;
  status: '' | ClaimStatus; setStatus: (v: '' | ClaimStatus) => void;
  sort: SortKey; setSort: (v: SortKey) => void;
}) {
  const { search, setSearch, status, setStatus, sort, setSort } = props;
  return (
    <Box sx={{ display:'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 2, mb: 2 }}>
      <TextField
        label="Search (id, holder, policy)"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        size="small"
      />
      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select label="Status" value={status} onChange={e=>setStatus(e.target.value as any)}>
          <MenuItem value="">All</MenuItem>
          {statuses.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Sort</InputLabel>
        <Select label="Sort" value={sort} onChange={e=>setSort(e.target.value as any)}>
          <MenuItem value="newly-created">Newly created</MenuItem>
          <MenuItem value="latest-created">Latest created</MenuItem>
          <MenuItem value="smallest-amount">Smallest claim amount</MenuItem>
          <MenuItem value="largest-amount">Largest claim amount</MenuItem>
          <MenuItem value="smallest-fee">Smallest processing fee</MenuItem>
          <MenuItem value="largest-fee">Largest processing fee</MenuItem>
          <MenuItem value="smallest-total">Smallest total amount</MenuItem>
          <MenuItem value="largest-total">Largest total amount</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
