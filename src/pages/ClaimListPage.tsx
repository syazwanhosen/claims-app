import { useEffect, useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchFilterBar from '../components/SearchFilterBar';
import ClaimTable from '../components/ClaimTable';
import AdminWelcomeDialog from '../components/AdminWelcomeDialog';
import { fetchClaims } from '../services/api';
import type { Claim, ClaimStatus } from '../types/claim';
import { sortClaims, type SortKey } from '../utils/sorting';

export default function ClaimListPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | ClaimStatus>('');
  const [sort, setSort] = useState<SortKey>('newly-created');
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    setShowAdmin(params.get('admin') === 'true');
  }, [params]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchClaims();
        if (mounted) setClaims(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return claims.filter(c => {
      const okStatus = status ? c.status === status : true;
      const okSearch = !q ? true : (
        String(c.id).includes(q) ||
        c.holder.toLowerCase().includes(q) ||
        c.policyNumber.toLowerCase().includes(q)
      );
      return okStatus && okSearch;
    });
  }, [claims, search, status]);

  const finalRows = useMemo(() => sortClaims(filtered, sort), [filtered, sort]);

  return (
    <Container sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Claims</Typography>
        <Button variant="contained" onClick={()=>navigate('/create-claim')}>Create claim</Button>
      </Stack>

      <SearchFilterBar
        search={search} setSearch={setSearch}
        status={status} setStatus={setStatus}
        sort={sort} setSort={setSort}
      />

      {loading ? <Typography>Loading…</Typography> : <ClaimTable rows={finalRows} />}

      <AdminWelcomeDialog open={showAdmin} onClose={()=>setShowAdmin(false)} />
    </Container>
  );
}
