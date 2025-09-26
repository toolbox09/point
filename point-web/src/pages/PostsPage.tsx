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
  tags: string[]
  isPublished: boolean
  likes: number
  views: number
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Ant Design 시스템으로 구축하는 현대적 UI',
      content: 'Ant Design은 기업급 웹 애플리케이션을 위한 디자인 언어입니다. 일관된 사용자 경험과 효율적인 개발을 제공합니다.',
      author: '디자인팀',
      date: '2024-01-20',
      tags: ['디자인', 'UI/UX', 'React'],
      isPublished: true,
      likes: 24,
      views: 156
    },
    {
      id: 2,
      title: 'React 18의 새로운 기능들',
      content: 'React 18에서 도입된 Concurrent Features, Suspense, 그리고 새로운 훅들에 대해 알아봅시다.',
      author: '개발팀',
      date: '2024-01-18',
      tags: ['React', '개발', 'Frontend'],
      isPublished: false,
      likes: 18,
      views: 89
    },
    {
      id: 3,
      title: 'TypeScript 모범 사례',
      content: 'TypeScript를 사용하여 더 안전하고 유지보수가 쉬운 코드를 작성하는 방법을 소개합니다.',
      author: '워커1',
      date: '2024-01-15',
      tags: ['TypeScript', '개발', '모범사례'],
      isPublished: true,
      likes: 32,
      views: 243
    },
    {
      id: 4,
      title: '성능 최적화 가이드',
      content: '웹 애플리케이션의 성능을 향상시키기 위한 다양한 기법들을 정리했습니다.',
      author: '워커2',
      date: '2024-01-12',
      tags: ['성능', '최적화', 'Web'],
      isPublished: true,
      likes: 45,
      views: 312
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'likes' | 'views'>('date')
  const [showOnlyPublished, setShowOnlyPublished] = useState(false)
  const [editingPost, setEditingPost] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ title: '', content: '' })

  // 모든 태그 추출
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  // 필터링 및 정렬
  const filteredAndSortedPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    if (showOnlyPublished) {
      filtered = filtered.filter(post => post.isPublished)
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes
        case 'views':
          return b.views - a.views
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
  }

  const togglePublishStatus = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, isPublished: !post.isPublished } : post
    ))
  }

  const likePost = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const deletePost = (id: number) => {
    if (confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const startEditing = (post: Post) => {
    setEditingPost(post.id)
    setEditForm({ title: post.title, content: post.content })
  }

  const saveEdit = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, title: editForm.title, content: editForm.content } : post
    ))
    setEditingPost(null)
    setEditForm({ title: '', content: '' })
  }

  const cancelEdit = () => {
    setEditingPost(null)
    setEditForm({ title: '', content: '' })
  }

  const addNewPost = () => {
    const newPost: Post = {
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      title: '새로운 포스트',
      content: '여기에 포스트 내용을 작성하세요.',
      author: '워커2',
      date: new Date().toISOString().split('T')[0],
      tags: ['새글'],
      isPublished: false,
      likes: 0,
      views: 0
    }
    setPosts([newPost, ...posts])
    startEditing(newPost)
  }

  const processedPosts = filteredAndSortedPosts()

  return (
    <div className="posts-page">
      <div className="posts-header">
        <div className="header-content">
          <h1 className="page-title">포스트 관리</h1>
          <p className="page-description">Ant Design 스타일의 포스트 관리 시스템</p>
        </div>
      </div>

      <div className="posts-controls">
        <div className="controls-row">
          <div className="search-group">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="포스트 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="tag-select"
            >
              <option value="">모든 태그</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'likes' | 'views')}
              className="sort-select"
            >
              <option value="date">최신순</option>
              <option value="likes">좋아요순</option>
              <option value="views">조회수순</option>
            </select>
          </div>

          <div className="action-group">
            <div className="checkbox-wrapper">
              <Checkbox
                id="published-filter"
                label="게시된 글만"
                checked={showOnlyPublished}
                onChange={setShowOnlyPublished}
              />
            </div>
            <Button variant="primary" onClick={addNewPost}>
              새 포스트
            </Button>
          </div>
        </div>
      </div>

      <div className="posts-stats">
        <div className="stats-item">
          <span className="stats-number">{posts.length}</span>
          <span className="stats-label">전체 포스트</span>
        </div>
        <div className="stats-item">
          <span className="stats-number">{processedPosts.length}</span>
          <span className="stats-label">표시 중</span>
        </div>
        <div className="stats-item">
          <span className="stats-number">{posts.filter(p => p.isPublished).length}</span>
          <span className="stats-label">게시됨</span>
        </div>
      </div>

      <div className="posts-grid">
        {processedPosts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>포스트가 없습니다</h3>
            <p>새로운 포스트를 작성해보세요!</p>
            {searchTerm && (
              <Button
                variant="secondary"
                onClick={() => setSearchTerm('')}
              >
                검색 초기화
              </Button>
            )}
          </div>
        ) : (
          processedPosts.map(post => (
            <div key={post.id} className={`post-card ${editingPost === post.id ? 'editing' : ''}`}>
              {editingPost === post.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="edit-title"
                    placeholder="포스트 제목"
                  />
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="edit-content"
                    placeholder="포스트 내용"
                    rows={4}
                  />
                  <div className="edit-actions">
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => saveEdit(post.id)}
                    >
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={cancelEdit}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="post-header">
                    <div className="post-status">
                      <span className={`status-badge ${post.isPublished ? 'published' : 'draft'}`}>
                        {post.isPublished ? '게시됨' : '초안'}
                      </span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                  </div>

                  <div className="post-meta">
                    <div className="meta-item">
                      <span className="meta-icon">👤</span>
                      <span>{post.author}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">👁</span>
                      <span>{post.views}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">❤</span>
                      <span>{post.likes}</span>
                    </div>
                  </div>

                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <p className="post-content">{post.content}</p>

                  <div className="post-actions">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => likePost(post.id)}
                    >
                      👍 좋아요
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => startEditing(post)}
                    >
                      ✏️ 편집
                    </Button>
                    <Button
                      variant={post.isPublished ? "secondary" : "primary"}
                      size="small"
                      onClick={() => togglePublishStatus(post.id)}
                    >
                      {post.isPublished ? '📝 비공개' : '🚀 게시'}
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => deletePost(post.id)}
                    >
                      🗑️ 삭제
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