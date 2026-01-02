'use client';

import { Button, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import { useActionState } from 'react';
import login from './login';

export default function Login() {
  const [state, formAction] = useActionState(login, { error: '' });

  return (
    <form action={formAction}>
      <Stack spacing={2} className="w-full max-w-xs">
        <TextField
          name="email"
          type="email"
          variant="outlined"
          label="Email"
          helperText={state.error}
          error={!!state.error}
        />
        <TextField
          name="password"
          type="password"
          variant="outlined"
          label="Password"
          helperText={state.error}
          error={!!state.error}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link className="self-center" href="/auth/signup" passHref>
          SignUp
        </Link>
      </Stack>
    </form>
  );
}
