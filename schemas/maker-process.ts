import { defineType, defineField } from "sanity";

export const makerProcess = defineType({
    name: 'maker-process',
    type: 'document',
    title: 'Maker Process',
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
            name: 'image',
            type: 'image',
            title: 'Image',
            fields: [
                {
                    name: 'altText',
                    type: 'string',
                    title: 'Alt Text'
                }
            ]
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
        }),
    ],
})