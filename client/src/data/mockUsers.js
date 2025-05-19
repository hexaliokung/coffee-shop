// Mock users data
export const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    role: 'user'
  }
];

// Mock JWT token generator
export const generateMockToken = (user) => {
  return `mock-token-${user.id}-${user.role}`;
}; 