// product.ts
import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    // -------- Identity --------
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Product name shown on the grid card, detail page heading, and cart line item.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL segment for /shop/:slug. Stable identifier — used as Snipcart data-item-id, so do NOT change after a product has been ordered.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // -------- Description (D-08; Claude\'s Discretion: short + portable text) --------
    defineField({
      name: 'description',
      type: 'string',
      title: 'Short description',
      description: 'Short description for cart line items and SEO meta. Max 200 characters.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body (rich description)',
      description: 'Rich product description rendered on /shop/:slug detail page.',
      of: [{ type: 'block' }], // portable text
    }),

    // -------- Commerce (price + manual inventory per D-06) --------
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price (USD)',
      description: 'USD price. Snipcart handles currency in checkout (single-currency v1).',
      validation: (Rule) => Rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'stockQuantity',
      type: 'number',
      title: 'Stock quantity',
      description:
        'Integer stock count. Storefront derives sold-out (0), low-stock (≤3), and normal display states. Owner edits manually after each sale.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),

    // -------- Display flags + optional metadata (D-08) --------
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Pin to top of /shop grid. Sort: featured desc, then _createdAt desc.',
      initialValue: false,
    }),
    defineField({
      name: 'dimensions',
      type: 'string',
      title: 'Dimensions',
      description:
        'Owner-formatted, e.g. "120 × 80 × 30 mm" or "4.7 × 3.1 × 1.2 in". Rendered in the spec table on /shop/:slug. Optional.',
    }),
    defineField({
      name: 'leadTime',
      type: 'string',
      title: 'Lead time',
      description:
        'Per-product shipping lead time, e.g. "Ships in 2–3 business days". Falls back to studio-info.shippingLeadTime if empty. Optional.',
    }),

    // -------- Images (D-07) --------
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description:
        '1–6 product photos. First image is hero (used by Snipcart data-item-image and grid card thumbnail). Required alt text per Phase 2 D-18 (no empty alts).',
      validation: (Rule) => Rule.required().min(1).max(6),
      of: [
        {
          type: 'object',
          name: 'productImage',
          title: 'Product image',
          fields: [
            defineField({
              name: 'asset',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'altText',
              type: 'string',
              title: 'Alt text',
              description:
                'Required. Describe the image for screen readers and SEO. No empty fallbacks, no filename text (Phase 2 D-18).',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption (optional)',
              description: 'Optional caption shown beneath the image in the detail-page gallery.',
            }),
          ],
          preview: {
            select: { media: 'asset', title: 'altText', subtitle: 'caption' },
          },
        },
      ],
    }),

    // -------- Cross-links (D-08, D-09) --------
    defineField({
      name: 'materials',
      type: 'array',
      title: 'Materials',
      description:
        'Cross-links to materials sections on /styles and /3d-printing for SEO + educational benefit. Optional.',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
    }),
    defineField({
      name: 'processes',
      type: 'array',
      title: 'Processes (service tag)',
      description:
        'Service tag: laser, print, or both. Pipe-separated for Snipcart data-item-categories at render time. Reuses the Phase 2 process enum docs.',
      of: [{ type: 'reference', to: [{ type: 'process' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),

    // -------- SEO (mirrors print-style.seo from Phase 2 §4) --------
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta title' },
        { name: 'metaDescription', type: 'text', rows: 2, title: 'Meta description' },
        {
          name: 'ogImage',
          type: 'image',
          title: 'og:image',
          fields: [{ name: 'altText', type: 'string', title: 'Alt text' }],
        },
      ],
    }),
  ],

  // -------- Studio list view --------
  preview: {
    select: {
      title: 'name',
      price: 'price',
      stock: 'stockQuantity',
      media: 'images.0.asset',
    },
    prepare({ title, price, stock, media }) {
      const priceLabel = typeof price === 'number' ? `$${price.toFixed(2)}` : '—';
      const stockLabel =
        typeof stock !== 'number'
          ? 'no stock value'
          : stock === 0
            ? 'SOLD OUT'
            : stock <= 3
              ? `Only ${stock} left`
              : `${stock} in stock`;
      return {
        title,
        subtitle: `${priceLabel} · ${stockLabel}`,
        media,
      };
    },
  },

  orderings: [
    {
      name: 'featured-newest',
      title: 'Featured first, newest next (matches /shop grid)',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      name: 'name-asc',
      title: 'Name (A → Z)',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});