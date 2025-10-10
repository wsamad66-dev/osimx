import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation / Header',
  type: 'document',
  initialValue: {
    title: 'Header Principal',
    logo: {
      text: "L'Étudiant à l'Étranger",
    },
    menuItems: [
      {
        _type: 'object',
        label: 'Accueil',
        link: '/',
        order: 1,
        hasDropdown: false,
      },
      {
        _type: 'object',
        label: 'Services',
        link: '/services',
        order: 2,
        hasDropdown: true,
        dropdownItems: [
          { _type: 'object', label: 'Admission', link: '/services/admission' },
          { _type: 'object', label: 'Visa', link: '/services/visa' },
          { _type: 'object', label: 'Logement', link: '/services/logement' },
        ],
      },
      {
        _type: 'object',
        label: 'Destinations',
        link: '/destinations',
        order: 3,
        hasDropdown: true,
        dropdownItems: [
          { _type: 'object', label: 'France', link: '/destinations/france' },
          { _type: 'object', label: 'Canada', link: '/destinations/canada' },
          { _type: 'object', label: 'Belgique', link: '/destinations/belgique' },
          { _type: 'object', label: 'Allemagne', link: '/destinations/allemagne' },
          { _type: 'object', label: 'Espagne', link: '/destinations/espagne' },
          { _type: 'object', label: 'Chine', link: '/destinations/chine' },
        ],
      },
    ],
    ctaButton: {
      text: 'Démarrer',
      link: '#',
      style: 'black',
      openModal: true,
    },
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (interne)',
      type: 'string',
      description: 'Nom pour identifier cette configuration (ex: "Header Principal")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Texte du logo',
          type: 'string',
          initialValue: "L'Étudiant à l'Étranger",
        },
        {
          name: 'image',
          title: 'Image du logo (optionnel)',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'menuItems',
      title: 'Éléments du menu',
      type: 'array',
      description: 'Ajoutez, modifiez ou supprimez des éléments de navigation',
      of: [
        {
          type: 'object',
          title: 'Élément de menu',
          fields: [
            {
              name: 'label',
              title: 'Libellé',
              type: 'string',
              description: 'Texte affiché dans le menu',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Lien',
              type: 'string',
              description: 'URL ou chemin (ex: /, /services, /destinations)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'hasDropdown',
              title: 'Activer le menu déroulant',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'dropdownItems',
              title: 'Sous-sections (dropdown)',
              type: 'array',
              description: 'Ajouter des sous-sections si le menu déroulant est activé',
              hidden: ({ parent }) => !parent?.hasDropdown,
              of: [
                {
                  type: 'object',
                  title: 'Sous-section',
                  fields: [
                    {
                      name: 'label',
                      title: 'Libellé',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Lien',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Description (optionnel)',
                      type: 'string',
                      description: 'Courte description de la sous-section',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'link',
                    },
                  },
                },
              ],
            },
            {
              name: 'order',
              title: 'Ordre',
              type: 'number',
              description: 'Ordre d\'affichage (1, 2, 3...)',
              initialValue: 1,
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'link',
              hasDropdown: 'hasDropdown',
            },
            prepare({ title, subtitle, hasDropdown }) {
              return {
                title: title,
                subtitle: `${subtitle} ${hasDropdown ? '(avec dropdown)' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Bouton CTA',
      type: 'object',
      description: 'Bouton principal dans le header',
      fields: [
        {
          name: 'text',
          title: 'Texte du bouton',
          type: 'string',
          initialValue: 'Démarrer',
        },
        {
          name: 'link',
          title: 'Lien',
          type: 'string',
          description: 'URL ou action (ex: /inscription, #contact)',
          initialValue: '#',
        },
        {
          name: 'style',
          title: 'Style du bouton',
          type: 'string',
          options: {
            list: [
              { title: 'Noir (défaut)', value: 'black' },
              { title: 'Bleu', value: 'blue' },
              { title: 'Orange', value: 'orange' },
            ],
          },
          initialValue: 'black',
        },
        {
          name: 'openModal',
          title: 'Ouvrir le formulaire d\'inscription',
          type: 'boolean',
          description: 'Activer pour ouvrir le modal au lieu de suivre le lien',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Navigation active',
      type: 'boolean',
      description: 'Une seule navigation peut être active à la fois',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? '✅ Active' : '❌ Inactive',
      }
    },
  },
})
