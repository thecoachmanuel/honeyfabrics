'use client'

import { useEffect } from 'react'

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">Application Error</h2>
      <div className="bg-red-50 p-4 rounded border border-red-200 max-w-xl w-full text-left overflow-auto">
        <p className="font-mono text-xs text-red-800">
          {error.message}
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
      >
        Try again
      </button>
    </div>
  )
}
