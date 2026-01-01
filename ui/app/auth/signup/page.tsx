'use client';

import { Button, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import createUser from './create-user';
import { useActionState } from 'react';

export default function SignUp() {
  const [state, formAction] = useActionState(createUser, { error: '' });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
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
          SignUp
        </Button>
        <Link className="self-center" href="/auth/login" passHref>
          Login
        </Link>
      </Stack>
    </form>
  );
}
