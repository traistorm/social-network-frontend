import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';

export default function Login() {
  return (
    <>
      {/* Login */}
      <div className='flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
        <div className='flex justify-center items-center w-6/12 h-1/2 bg-gradient-to-r from-orange-400 from-10% via-red-400 via-30% to-yellow-500 to-90% p-2 rounded-xl'>
          <div className=''>
            <Image
              src="/images/login1.jpg"
              width="0"
              height="0"
              sizes="100vw"
              className="w-max h-auto rounded-xl"
            />
          </div>
          <div>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField label="Username" variant="filled" color="success" focused />
            </Box>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField label="Password" variant="filled" color="success" focused />
            </Box>
            <IconButton aria-label="fingerprint" color="success">
              <LoginIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
