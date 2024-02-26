import { faker } from '@faker-js/faker';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('students').del();

  const CPFS = [
    '12345678909',
    '98765432100',
    '11122233344',
    '55566677788',
    '99988877766',
  ];

  const entries = [];

  for (let i = 0; i < 50; i++) {
    entries.push({
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      ra: faker.string.uuid(),
      cpf: CPFS[i % CPFS.length],
    });
  }

  await knex('students').insert(entries);
}
