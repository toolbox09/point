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
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'author'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [editingPost, setEditingPost] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ title: '', content: '' })
  const [isLoading, setIsLoading] = useState(false)

  const togglePublishStatus = async (id: number) => {
    setIsLoading(true)
    // 실제 API 호출을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500))
    setPosts(posts.map(post =>
      post.id === id ? { ...post, isPublished: !post.isPublished } : post
    ))
    setIsLoading(false)
  }

  const addNewPost = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    const newPost: Post = {
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      title: `새로운 포스트 ${posts.length + 1}`,
      content: '새로 추가된 포스트입니다.',
      author: '워커2',
      date: new Date().toISOString().split('T')[0],
      isPublished: false
    }
    setPosts([newPost, ...posts])
    setIsLoading(false)
  }

  const deletePost = async (id: number) => {
    if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    setPosts(posts.filter(post => post.id !== id))
    setIsLoading(false)
  }

  const startEditing = (post: Post) => {
    setEditingPost(post.id)
    setEditForm({ title: post.title, content: post.content })
  }

  const saveEdit = async (id: number) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setPosts(posts.map(post =>
      post.id === id ? { ...post, title: editForm.title, content: editForm.content } : post
    ))
    setEditingPost(null)
    setEditForm({ title: '', content: '' })
    setIsLoading(false)
  }

  const cancelEdit = () => {
    setEditingPost(null)
    setEditForm({ title: '', content: '' })
  }

  const sortPosts = (posts: Post[]) => {
    return [...posts].sort((a, b) => {
      let aValue: string | number = a[sortBy]
      let bValue: string | number = b[sortBy]

      if (sortBy === 'date') {
        aValue = new Date(aValue as string).getTime()
        bValue = new Date(bValue as string).getTime()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  const filteredAndSortedPosts = () => {
    let filtered = posts

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 게시 상태 필터
    if (showOnlyPublished) {
      filtered = filtered.filter(post => post.isPublished)
    }

    // 정렬
    return sortPosts(filtered)
  }

  const processedPosts = filteredAndSortedPosts()

  return (
    <div className="posts-page">
      {isLoading && <div className="loading-overlay">처리중...</div>}

      <div className="posts-header">
        <h1>포스트 관리</h1>
        <div className="posts-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="포스트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-section">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'author')}
              className="sort-select"
            >
              <option value="date">날짜순</option>
              <option value="title">제목순</option>
              <option value="author">작성자순</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="filter-section">
            <Checkbox
              id="filter-published"
              label="게시된 포스트만 보기"
              checked={showOnlyPublished}
              onChange={setShowOnlyPublished}
            />
          </div>

          <Button
            variant="primary"
            onClick={addNewPost}
            disabled={isLoading}
          >
            새 포스트 추가
          </Button>
        </div>
      </div>

      <div className="posts-stats">
        <p>전체 {posts.length}개 포스트 중 {processedPosts.length}개 표시</p>
      </div>

      <div className="posts-list">
        {processedPosts.length === 0 ? (
          <div className="no-posts">
            <p>표시할 포스트가 없습니다.</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search-btn"
              >
                검색 초기화
              </button>
            )}
          </div>
        ) : (
          processedPosts.map(post => (
            <div key={post.id} className={`post-card ${post.isPublished ? 'published' : 'draft'} ${editingPost === post.id ? 'editing' : ''}`}>
              {editingPost === post.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="edit-title-input"
                    placeholder="포스트 제목"
                  />
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="edit-content-textarea"
                    placeholder="포스트 내용"
                    rows={4}
                  />
                  <div className="edit-actions">
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => saveEdit(post.id)}
                      disabled={isLoading || !editForm.title.trim() || !editForm.content.trim()}
                    >
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={cancelEdit}
                      disabled={isLoading}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <>
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
                      disabled={isLoading}
                    >
                      {post.isPublished ? '게시 취소' : '게시하기'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => startEditing(post)}
                      disabled={isLoading}
                    >
                      편집
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => deletePost(post.id)}
                      disabled={isLoading}
                    >
                      삭제
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}