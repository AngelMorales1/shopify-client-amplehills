import portableText from './subschemas/portableText';
import image from './subschemas/image';

export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fieldsets: [
    {
      name: 'nav',
      title: 'Navigation',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'newsletter',
      title: 'Newsletter',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'footer',
      title: 'Footer',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'social',
      title: 'Social',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'pledge',
      title: 'Our Pledge',
      options: { collapsible: true, collapsed: true }
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    portableText({
      name: 'alert',
      title: 'Alert Banner',
      fieldset: 'nav'
    }),
    image({
      name: 'logo',
      title: 'Logo',
      fieldset: 'nav'
    }),
    image({
      name: 'profileIcon',
      title: 'Profile Icon',
      fieldset: 'nav'
    }),
    image({
      name: 'locationDropdownNavImage',
      title: 'Location Dropdown Image',
      fieldset: 'nav'
    }),
    {
      name: 'productsInNav',
      title: 'Products in Dropdown',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }]}]
    },
    image({
      name: 'ourPledgeIcon',
      title: 'Our Pledge Icon',
      fieldset: 'pledge'
    }),
    image({
      name: 'ourPledgeCalloutImage',
      title: 'Our Pledge Callout Image',
      fieldset: 'pledge'
    }),
    {
      name: 'ourPledgeShippingInfo',
      title: 'Shipping Information',
      type: 'string',
      fieldset: 'pledge'
    },
    {
      name: 'ourPledgeShippingPledge',
      title: 'Pledge',
      type: 'string',
      fieldset: 'pledge'
    },
    {
      name: 'footerNav',
      title: 'Footer Nav',
      fieldset: 'footer',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          image({
            name: 'ourPledgeIcon',
            title: 'Our Pledge Icon',
            fieldset: 'pledge'
          }),
          {
            type: 'string',
            name: 'text',
            title: 'Text'
          },
          {
            name: 'link',
            title: 'Link',
            type: 'url',
            validation: Rule => Rule.uri({ allowRelative: true })
          },
        ]
      }]
    },
    image({
      name: 'footerIllustration',
      title: 'Footer Illustration',
      fieldset: 'footer'
    }),
    {
      name: 'subscribeNewsletterTitle',
      title: 'Newsletter Popup Title',
      type: 'string',
      fieldset: 'newsletter'
    },
    portableText({
      name: 'subscribeNewsletterDescription',
      title: 'Subscrib Newsletter Desciption',
      fieldset: 'newsletter'
    }),
    {
      name: 'facebookLink',
      title: 'Facebook Link',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true }),
      fieldset: 'social'
    },
    image({
      name: 'facebookIcon',
      title: 'Facebook Icon',
      fieldset: 'social'
    }),
    {
      name: 'twitterLink',
      title: 'Twitter Link',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true }),
      fieldset: 'social'
    },
    image({
      name: 'twitterIcon',
      title: 'Twitter Icon',
      fieldset: 'social'
    }),
    {
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true }),
      fieldset: 'social'
    },
    image({
      name: 'instagramIcon',
      title: 'Instagram Icon',
      fieldset: 'social'
    }),
  ]
};
