import { defineType, defineField } from "sanity";

export const laserSpecs = defineType({
    name: 'laser-specs',
    type: 'document',
    title: 'Laser Specs',
    fields: [
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
    ],
})