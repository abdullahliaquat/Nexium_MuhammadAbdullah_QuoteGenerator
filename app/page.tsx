'use client'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, Users, Target, Copy, ExternalLink } from 'lucide-react'

const quotes: Record<string, string[]> = {
  life: [
    "Life is what happens when you're busy making other plans.",
    "Live in the sunshine, swim in the sea, drink the wild air.",
    "Life itself is the most wonderful fairy tale."
  ],
  love: [
    "Love is composed of a single soul inhabiting two bodies.",
    "To love and be loved is to feel the sun from both sides.",
    "The best thing to hold onto in life is each other."
  ],
  success: [
    "Success is not final, failure is not fatal.",
    "The road to success and the road to failure are almost exactly the same.",
    "Don't be afraid to give up the good to go for the great."
  ]
}

const topicCategories = [
  { key: 'life', label: 'Life & Philosophy', icon: Target, color: 'bg-blue-600' },
  { key: 'love', label: 'Relationships', icon: Users, color: 'bg-emerald-600' },
  { key: 'success', label: 'Business & Success', icon: TrendingUp, color: 'bg-orange-600' }
]

export default function Home() {
  const [topic, setTopic] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleSubmit = async () => {
    if (!topic.trim()) return
    
    setIsLoading(true)
    setResults([])
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const result = quotes[topic.toLowerCase()]
    setResults(result || ["No quotes found for this topic. Try 'life', 'love', or 'success'."])
    setIsLoading(false)
  }

  const handleCategorySelect = (categoryKey: string) => {
    setTopic(categoryKey)
    setSelectedCategory(categoryKey)
    setTimeout(() => handleSubmit(), 100)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">QuoteStream</h1>
                <p className="text-sm text-slate-600">Professional Quote Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Abdullah</span>
              <span>@</span>
              <span>Nexium</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Search Quotes</h2>
            <p className="text-slate-600">Find inspirational quotes by topic or keyword</p>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter topic (life, love, success)"
                className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !topic.trim()}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-medium"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topicCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategorySelect(category.key)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedCategory === category.key
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{category.label}</h4>
                      <p className="text-sm text-slate-600">View quotes</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Results ({results.length})
              </h3>
              <span className="text-sm text-slate-600 capitalize">
                Category: {topic || 'All'}
              </span>
            </div>
            
            <div className="space-y-4">
              {results.map((quote, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <blockquote className="text-slate-800 text-lg leading-relaxed mb-3">
  &quot;{quote}&quot;
</blockquote>

                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span className="capitalize font-medium">Topic: {topic}</span>
                        <span>•</span>
                        <span>ID: QT-{String(idx + 1).padStart(3, '0')}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => copyToClipboard(quote, idx)}
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors duration-200"
                        title="Share quote"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {copiedIndex === idx && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                      Quote copied to clipboard
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No quotes found</h3>
            <p className="text-slate-600 mb-6">Enter a topic above or select a category to get started</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>© 2025 QuoteStream. All rights reserved.</p>
            <div className="flex space-x-4">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}