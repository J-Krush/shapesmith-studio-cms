import { defineType, defineField } from "sanity";

export const laserStyle = defineType({
    name: 'laser-style',
    type: 'document',
    title: 'Laser Art Style',

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
            name: 'header',
            type: 'string',
            title: 'Header (Long title)'
        }),
        defineField({
            name: 'slug',
            type: 'string',
            title: 'Slug'
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
                },
                {
                    name: 'linkToDesign',
                    type: 'string',
                    title: 'Link to Design'
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
                        },
                        {
                            name: 'linkToDesign',
                            type: 'string',
                            title: 'Link to Design'
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'considerations',
            type: 'text',
            title: 'Considerations',
        }),
        defineField({
            name: 'preferredMaterials',
            type: 'string',
            title: 'Preferred Materials',
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
        }),
    ],
})