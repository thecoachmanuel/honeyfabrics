'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full overflow-auto">
            <p className="font-mono text-sm text-left whitespace-pre-wrap text-red-800 bg-red-50 p-4 rounded border border-red-200">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
