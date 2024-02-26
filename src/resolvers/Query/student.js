export async function students(_, __, ctx) {
  return ctx.database('students').select('*').limit(5);
}
