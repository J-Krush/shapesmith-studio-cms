import { defineType, defineField } from "sanity";

export const collaboration = defineType({
    name: 'collaboration',
    type: 'document',
    title: 'Collaboration',

    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
        }),
        defineField({
            name: 'images',
            type: 'array',
            title: 'Images',
            of: [
                {
                    title: 'Image',
                    type: 'image',
                    name: 'image',
                    fields: [
                        {
                            name: 'altText',
                            type: 'string',
                            title: 'Alt Text'
                        }
                    ]
                }
            ]
        })
    ],
})