import { useState, useEffect } from 'react'
import axios from 'axios'

function useFetch(url, method, payload) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios[method](url, payload)
            .then(res => {
                setLoading(false)
                setData(res)
            }).catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [url])

    return { data, error, loading }
}

export default useFetch;    