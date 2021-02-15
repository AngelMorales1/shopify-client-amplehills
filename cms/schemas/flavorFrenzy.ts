import slugIsValid from '../utils/slugIsValid';

export default {
  name: 'flavorFrenzy',
  title: 'Flavor Frenzy',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Flavor Frenzy Name',
      type: 'string',
      description: 'The name of the flavor frenzy event. Example: "Flavor Frenzy 2021"'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: Rule => Rule.required().custom(slugIsValid),
      description:
        'This is the URL for the flavor frenzy. Should look like "the-name-of-the-flavor" all lowercase and separated by hyhens. Example: "flavor-frenzy-2021"'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'rounds',
      title: 'Rounds',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Round Name',
            type: 'string'
          },
          {
            name: 'isActive',
            title: 'Round is active?',
            type: 'boolean',
            description: 'Toggle on if this is the round you want users to actively vote on.'
          },
          {
            name: 'matches',
            title: 'Matches',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                {
                  name: 'flavor1',
                  title: 'Flavor 1',
                  type: 'reference',
                  to: [{ type: 'flavor' }]
                },
                {
                  name: 'flavor2',
                  title: 'Flavor 2',
                  type: 'reference',
                  to: [{ type: 'flavor' }]
                },
                {
                  name: 'winner',
                  title: 'Winner',
                  type: 'reference',
                  to: [{ type: 'flavor' }]
                }
              ],
              preview: {
                select: {
                  flavor1: 'flavor1.name',
                  flavor2: 'flavor2.name'
                },
                prepare(selection) {
                  return {
                    title: `${selection.flavor1} vs. ${selection.flavor2}`
                  }
                }
              }
            }]
          }
        ],
        preview: {
          select: {
            name: 'name',
            isActive: 'isActive'
          },
          prepare(selection) {
            return {
              title: selection.name,
              subtitle: selection.isActive ? '✅ Active' : '🚫 Inactive'
            }
          }
        }
      }]
    }
  ]
};
