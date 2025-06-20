import {useAddMovie} from '@hooks/use-movies'
import {useState} from 'react'
import {CreateMovieSchema} from '@provider-schema/schema'
import type {ZodError} from 'zod'

export function useMovieForm() {
  const [movieName, setMovieName] = useState('')
  const [movieYear, setMovieYear] = useState(2023)
  const [movieRating, setMovieRating] = useState(0)
  const [validationError, setValidationError] = useState<ZodError | null>(null)

  const {status, mutate} = useAddMovie()
  const movieLoading = status === 'pending'

  // Zod Key feature 3: safeParse
  // Zod note: if you have a frontend, you can use the schema + safeParse there
  // in order to perform form validation before sending the data to the server
  const handleAddMovie = () => {
    const result = CreateMovieSchema.safeParse({
      name: movieName,
      year: movieYear,
      rating: movieRating,
    })

    // Zod key feature 4: you can utilize
    // and expose the validation state to be used at a component
    if (!result.success) {
      setValidationError(result.error)
      return
    }

    mutate({name: movieName, year: movieYear, rating: movieRating})
    setMovieName('')
    setMovieYear(2023)
    setMovieRating(0)
    setValidationError(null)
  }

  return {
    movieName,
    movieYear,
    movieRating,
    setMovieName,
    setMovieYear,
    setMovieRating,
    handleAddMovie,
    movieLoading,
    validationError, // for Zod key feature 4: expose the validation state
  }
}
