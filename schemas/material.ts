import { defineType, defineField } from "sanity";

export const material = defineType({
    name: 'material',
    type: 'document',
    title: 'Material',

    fields: [
        defineField({
            name: 'order',
            type: 'number',
            title: 'Order',
        }),
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
        defineField({
            name: 'processes',
            type: 'string',
            title: 'Processes'
        }),
        defineField({
            name: 'listImage',
            type: 'image',
            title: 'List Image',
            fields: [
                {
                    name: 'altText',
                    type: 'string',
                    title: 'Alt Text'
                }
            ]
        }),
        defineField({
            name: 'detailImages',
            type: 'array',
            title: 'Detail Images',
            of: [
                {
                    title: 'Detail Image',
                    type: 'image',
                    name: 'detail-image',
                    fields: [
                        {
                            name: 'altText',
                            type: 'string',
                            title: 'Alt Text'
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'cuttingSpecs',
            type: 'string',
            title: 'Cutting',
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
        }),
        defineField({
            name: 'disclaimer',
            type: 'text',
            title: 'Disclaimer',
        }),
    ],
})