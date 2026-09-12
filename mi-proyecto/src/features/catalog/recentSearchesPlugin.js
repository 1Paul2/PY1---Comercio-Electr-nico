import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'

export const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'grupo07-recent-searches',
  limit: 5,
})