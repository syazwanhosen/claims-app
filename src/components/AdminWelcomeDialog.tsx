import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function AdminWelcomeDialog({ open, onClose }:{open:boolean; onClose:()=>void}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Welcome, Admin</DialogTitle>
      <DialogContent>Thanks for visiting the claim portal.</DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
