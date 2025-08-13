import { FocusEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { createClaim, lookupPolicies } from '../services/api';
import { isIncidentDateValid } from '../utils/dates';
import { useNavigate } from 'react-router-dom';

const moneyRegex = /^\d+(\.\d{2})$/;

const schema = z.object({
  policyNumber: z.string().min(1, 'Required'),
  holder: z.string().min(1, 'Required'),
  insuredItem: z.string().min(1, 'Required'),
  amount: z.string().regex(moneyRegex, 'Use 2 decimals, e.g. "15.50"'),
  description: z.string().min(1, 'Required'),
  incidentDate: z.date(),
  processingFee: z.string().regex(moneyRegex, 'Use 2 decimals, e.g. "15.50"'),
}).refine((v)=> isIncidentDateValid(v.incidentDate), {
  path: ['incidentDate'],
  message: 'Must be within the last 6 months and before tomorrow',
});

type FormValues = z.infer<typeof schema>;

export default function CreateClaimPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, setError, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        policyNumber: '',
        holder: '',
        insuredItem: '',
        amount: '',
        description: '',
        incidentDate: dayjs().toDate(),
        processingFee: '',
      }
    });

  const onPolicyBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const q = e.target.value.trim();
    if (!q) return;
    try {
      const list = await lookupPolicies(q);
      if (list.length > 0) {
        const match = list.find(p => p.number === q) ?? list[0];
        if (match?.holder) setValue('holder', match.holder, { shouldValidate: true });
      }
    } catch {
      // ignore lookup failures
    }
  };

  const onSubmit = async (v: FormValues) => {
    try {
      await createClaim({
        policyNumber: v.policyNumber,
        holder: v.holder,
        insuredItem: v.insuredItem,
        amount: v.amount,
        description: v.description,
        processingFee: v.processingFee,
        incidentDate: dayjs(v.incidentDate).format('YYYY-MM-DD'),
      });
      navigate('/claims');
    } catch (e) {
      setError('policyNumber', { message: 'Failed to create claim. Check server.' });
    }
  };

  return (
    <Container sx={{ py: 3, maxWidth: 720 }}>
      <Typography variant="h5" mb={2}>Create claim</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Policy number"
            {...register('policyNumber')}
            onBlur={onPolicyBlur}
            error={!!errors.policyNumber}
            helperText={errors.policyNumber?.message}
          />
          <TextField
            label="Holder name"
            {...register('holder')}
            error={!!errors.holder}
            helperText={errors.holder?.message}
          />
          <TextField
            label="Insured item"
            {...register('insuredItem')}
            error={!!errors.insuredItem}
            helperText={errors.insuredItem?.message}
          />
          <TextField
            label='Claim amount (e.g. "15.50")'
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
          <TextField
            label="Description"
            multiline minRows={3}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name="incidentDate"
              render={({ field }) => (
                <DatePicker
                  label="Incident date"
                  value={dayjs(field.value) as Dayjs}
                  onChange={(d)=> field.onChange(d?.toDate() ?? new Date())}
                  slotProps={{
                    textField: {
                      error: !!errors.incidentDate,
                      helperText: errors.incidentDate?.message,
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            label='Processing fee (e.g. "15.50")'
            {...register('processingFee')}
            error={!!errors.processingFee}
            helperText={errors.processingFee?.message}
          />

          <Stack direction="row" gap={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={()=>navigate('/claims')}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>Create</Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
