export class Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  archived: boolean;
  createdAt: string;
  updatedAt?: string;
}