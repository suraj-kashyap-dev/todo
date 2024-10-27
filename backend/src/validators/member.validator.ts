import { z } from 'zod';
import { Role } from '../types/member.types';

export const memberSchema = z.object({
  userId: z.string(),
  workspaceId: z.string(),
  role: z.enum([Role.ADMIN, Role.MEMBER, Role.GUEST]),
});

export type MemberInput = z.infer<typeof memberSchema>;
