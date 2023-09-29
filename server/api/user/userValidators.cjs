const { z } = require('zod');

const ZNewUserInput = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(4, { message: 'Username must contain at least 4 characters.' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must contain at least 8 characters.' }),
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password entries must match one another.',
  });

function validateNewUserInput({ username, password, confirmPassword }) {
  return ZNewUserInput.parse({ username, password, confirmPassword });
}

module.exports = { validateNewUserInput };
