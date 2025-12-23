import { Button, Stack, TextField } from '@mui/material';
import Link from 'next/link';

export default function Login() {
  return (
    <Stack spacing={2} className="w-full max-w-xs">
      <TextField type="email" variant="outlined" label="Email" />
      <TextField type="password" variant="outlined" label="Password" />
      <Button variant="contained">Login</Button>
      <Link className="self-center" href="/auth/signup" passHref>
        SignUp
      </Link>
    </Stack>
  );
}
