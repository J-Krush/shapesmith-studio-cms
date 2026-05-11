// process.ts
import { defineType, defineField } from 'sanity';

export const process = defineType({
  name: 'process',
  type: 'document',
  title: 'Process',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'Key',
      description: 'Stable identifier — "laser" or "print". Lowercase, no spaces.',
      options: { list: ['laser', 'print'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'label', type: 'string', title: 'Display label' }),
  ],
  preview: { select: { title: 'label', subtitle: 'key' } },
});
