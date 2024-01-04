import { Plugin } from '@/lib/pluginloader'
const HackerNews: Plugin = {
  name: 'Hacker News',
  id: 'bunker.hackernews',
  description: 'Show the top 5 posts on Hacker News',

  tile() {
    return (
      <div>
        <ul>
          <li>Post 1</li>
          <li>Post 2</li>
          <li>Post 3</li>
          <li>Post 4</li>
          <li>Post 5</li>
        </ul>
      </div>
    )
  }
}

export default HackerNews
