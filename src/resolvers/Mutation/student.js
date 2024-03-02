export function createStudent(parent, args, context, info) {
  return context.prisma.createStudent({
    name: args.name,
    email: args.email,
  });
}
