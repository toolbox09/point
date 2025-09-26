import { useState } from 'react'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import './PostsPage.css'

interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
  isPublished: boolean
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '첫 번째 포스트',
      content: '이것은 첫 번째 포스트의 내용입니다. React Router를 사용하여 페이지 라우팅을 구현했습니다.',
      author: '워커2',
      date: '2024-01-15',
      isPublished: true
    },
    {
      id: 2,
      title: '컴포넌트 개발 가이드',
      content: 'Button, Checkbox, RadioButton 등 다양한 UI 컴포넌트를 개발하는 방법에 대해 설명합니다.',
      author: '개발팀',
      date: '2024-01-14',
      isPublished: false
    },
    {
      id: 3,
      title: 'TypeScript와 React',
      content: 'TypeScript를 사용하여 React 애플리케이션을 더욱 안전하고 효율적으로 개발하는 방법을 알아봅시다.',
      author: '워커1',
      date: '2024-01-13',
      isPublished: true
    }
  ])

  const [showOnlyPublished, setShowOnlyPublished] = useState(false)

  const togglePublishStatus = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, isPublished: !post.isPublished } : post
    ))
  }

  const addNewPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      title: `새로운 포스트 ${posts.length + 1}`,
      content: '새로 추가된 포스트입니다.',
      author: '워커2',
      date: new Date().toISOString().split('T')[0],
      isPublished: false
    }
    setPosts([newPost, ...posts])
  }

  const filteredPosts = showOnlyPublished
    ? posts.filter(post => post.isPublished)
    : posts

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1>포스트 관리</h1>
        <div className="posts-controls">
          <Checkbox
            id="filter-published"
            label="게시된 포스트만 보기"
            checked={showOnlyPublished}
            onChange={setShowOnlyPublished}
          />
          <Button variant="primary" onClick={addNewPost}>
            새 포스트 추가
          </Button>
        </div>
      </div>

      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>표시할 포스트가 없습니다.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className={`post-card ${post.isPublished ? 'published' : 'draft'}`}>
              <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-status">
                  <span className={`status-badge ${post.isPublished ? 'published' : 'draft'}`}>
                    {post.isPublished ? '게시됨' : '초안'}
                  </span>
                </div>
              </div>

              <div className="post-meta">
                <span className="post-author">작성자: {post.author}</span>
                <span className="post-date">날짜: {post.date}</span>
              </div>

              <p className="post-content">{post.content}</p>

              <div className="post-actions">
                <Button
                  variant={post.isPublished ? "secondary" : "primary"}
                  size="small"
                  onClick={() => togglePublishStatus(post.id)}
                >
                  {post.isPublished ? '게시 취소' : '게시하기'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}