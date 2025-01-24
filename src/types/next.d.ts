import { NextApiRequest } from 'next/types';
import { TokenPayload } from './auth';

declare module 'next/types' {
  interface NextApiRequest {
    user?: TokenPayload;
  }
}
