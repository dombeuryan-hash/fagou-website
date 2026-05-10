import { newsData } from '../data/newsData'
import type { NewsArticle } from '../types'

export function getAllArticles(): NewsArticle[] {
  return newsData.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getArticleById(id: string): NewsArticle | undefined {
  return newsData.find((a) => a.id === id)
}

export function getArticlesByCategory(category: string): NewsArticle[] {
  if (!category) return getAllArticles()
  return getAllArticles().filter((a) => a.category === category)
}

export function getRelatedArticles(article: NewsArticle, limit = 2): NewsArticle[] {
  return newsData
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, limit)
}

export function getUniqueCategories(): string[] {
  return [...new Set(newsData.map((a) => a.category))]
}
