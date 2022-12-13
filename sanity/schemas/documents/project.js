import React from 'react';

import {BsPaletteFill} from 'react-icons/bs';

export default {
  name: 'projects',
  type: 'document',
  title: 'Projects',
  icon: BsPaletteFill,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Project Title',
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'Project URL',
      validation: Rule => Rule.required(),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      validation: Rule => Rule.required(),
    },
    {
      name: 'mediums',
      type: 'array',
      title: 'Mediums',
      of: [{type: 'string'}],
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: Rule => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
};
