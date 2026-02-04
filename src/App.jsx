import { useState } from 'react'
import InputForm from './components/InputForm'
import ResponseCard from './components/ResponseCard'
import { generateMessages } from './utils/messageGenerator'

function App() {
  const [responses, setResponses] = useState(null)
  const [toast, setToast] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (formData) => {
    setIsGenerating(true)
    
    // Small delay for visual feedback
    setTimeout(() => {
      const messages = generateMessages(formData)
      setResponses(messages)
      setIsGenerating(false)
      
      // Scroll to results on mobile
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }, 300)
  }

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const handleReset = () => {
    setResponses(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-2xl">🏷️</span>
            </div>
            <h1 className="text-4xl font-bold gradient-text">Haggly</h1>
          </div>
          
          <p className="text-gray-600 text-lg">
            Generate perfect responses for marketplace negotiations
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Never freeze up when someone lowballs you again
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-12">
        <div className="max-w-lg mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 mb-8">
            <InputForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating}
            />
          </div>

          {/* Results */}
          {responses && (
            <div id="results" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Responses
                </h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← New negotiation
                </button>
              </div>
              
              <p className="text-gray-500 text-sm">
                Pick the tone that fits your style. Tap to copy!
              </p>

              {responses.map((response, index) => (
                <ResponseCard
                  key={index}
                  tone={response.tone}
                  emoji={response.emoji}
                  message={response.message}
                  description={response.description}
                  onCopy={() => showToast('Copied to clipboard!')}
                  delay={index * 100}
                />
              ))}

              {/* Tips Section */}
              <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-100">
                <h3 className="font-semibold text-primary-800 mb-2 flex items-center gap-2">
                  <span>💡</span> Quick Tips
                </h3>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• Be polite but firm — you set the price for a reason</li>
                  <li>• It's okay to say no — good buyers respect fair prices</li>
                  <li>• Don't take lowballs personally, just part of the game</li>
                </ul>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!responses && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-5xl mb-4">💬</div>
              <p>Fill in the details above to generate responses</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>Made with 💜 for marketplace sellers everywhere</p>
      </footer>
    </div>
  )
}

export default App
