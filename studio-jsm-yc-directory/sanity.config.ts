import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {markdownSchema} from 'sanity-plugin-markdown'

export default defineConfig({
  name: 'default',
  title: 'JSM YC Directory',

  projectId: '0o5f0wwj',
  dataset: 'production',

  plugins: [structureTool(), visionTool({defaultApiVersion: 'vX'}), markdownSchema()],

  schema: {
    types: schemaTypes,
  },
})
